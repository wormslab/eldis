'use strict'

import { app, ipcMain, BrowserWindow } from 'electron'
import redis from 'redis'
import bluebird from 'bluebird'

import Store from 'electron-store'
const store = new Store()

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('req-connect-list', async (opt) => {
  const servers = store.get('servers') || {}
  mainWindow.webContents.send('res-connect-list', servers)
})

ipcMain.on('req-add-connect', (event, connect) => {
  connect = connect || {}
  const servers = store.get('servers') || {}
  if (servers[connect.name]) {
    throw Error('Connection name duplicated')
  }
  servers[connect.name] = connect
  store.set('servers', servers)
  mainWindow.webContents.send('res-connect-list', servers)
})

ipcMain.on('req-remove-connect', (event, connect) => {
  connect = connect || {}
  const servers = store.get('servers') || {}
  delete servers[connect.name]
  store.set('servers', servers)
  mainWindow.webContents.send('res-connect-list', servers)
})

ipcMain.on('connect-redis', async (event, { connect, tabId }) => {
  connect = connect || {}
  if (!tabId) {
    throw new Error('::Tab id required')
  }
  console.log('======================= connect-redis')
  console.log(connect, tabId)
  app.client = app.client || {}
  app.client[tabId] = redis.createClient(connect)
  app.client[tabId].on('error', function (err) {
    console.log('Error ' + err)
  })
  const [ cursor, keys ] = await app.client[tabId].scanAsync([ '0', 'MATCH', '*', 'COUNT', '100' ])
    .catch(err => {
      console.log('======================================== err')
      console.log(err)
    })
  mainWindow.webContents.send('redis-connected', { cursor, keys, tabId })
})

ipcMain.on('disconnect-redis', async (event, { tabId }) => {
  if (!tabId) {
    throw new Error('::Tab id required')
  }
  app.client = app.client || {}
  if (app.client[tabId]) {
    app.client[tabId].quit()
    mainWindow.webContents.send('redis-disconnected', { tabId })
  }
})

ipcMain.on('redis-command', async (evnet, command, args, payload) => {
  console.log('======================= redis-command')
  console.log(command, args)
  const tabId = payload.tabId
  if (!tabId) {
    throw new Error('::Tab id required')
  }
  const asyncCommand = `${command}Async`
  if (typeof app.client[tabId][asyncCommand] !== 'function') {
    throw new Error('Unsupported redis command error')
  }
  const reply = await app.client[tabId][asyncCommand](args)
    .catch(err => { throw err })
  mainWindow.webContents.send('redis-command-reply', { command, reply, payload })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
