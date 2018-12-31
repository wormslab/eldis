<template>
  <section class="create-connect-content">
    <div class="label-input-container">
      <div class="content-label">Name</div>
      <div class="content-input">
        <v-text-field v-model="name" 
                      data-vv-name="name"
                      :message="vErrors.first('name')"
                      v-validate="'required'"
        />
      </div>
    </div>
    <div class="label-input-container">
      <div class="content-label">Host</div>
      <div class="content-input">
        <v-text-field v-model="host"
                      data-vv-name="host"
                      :message="vErrors.first('host')"
                      v-validate="'required'"
        />
      </div>
    </div>
    <div class="label-input-container">
      <div class="content-label">Password</div>
      <div class="content-input">
        <v-text-field v-model="password" />
      </div>
    </div>
    <div class="label-input-container">
      <div class="content-label">Port</div>
      <div class="content-input">
        <v-text-field v-model="port" />
      </div>
    </div>
    <div class="btn-container">
      <v-button class="connect-btn" @click="handleClickConnect">
        <i class="fa fa-plug"></i>
        <span>connect</span>
      </v-button>
    </div>
  </section>
</template>

<script>
import VTextField from '../Common/VTextField'
import VButton from '../Common/VButton'
export default {
  data () {
    const connect = this.connect || {}
    return {
      name: connect.name || '',
      host: connect.host || '',
      password: connect.password || '',
      port: connect.port || ''
    }
  },
  props: {
    connect: {
      type: Object,
      default: null
    }
  },
  methods: {
    async handleClickConnect () {
      const valid = await this.$validator.validateAll()
      if (!valid) {
        return null
      }
      this.$emit('connect', {
        name: this.name,
        host: this.host,
        password: this.password,
        port: this.port
      })
    }
  },
  watch: {
    'connect': {
      deep: true,
      handler () {
        const connect = this.connect || {}
        this.name = connect.name || ''
        this.host = connect.host || ''
        this.password = connect.password || ''
        this.port = connect.port || ''
      }
    }
  },
  components: {
    VTextField,
    VButton
  }
}
</script>

<style lang="scss" scoped>
.create-connect-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;

  .label-input-container {
    margin-top: 15px;
    > div {
      height: 30px;
      line-height: 30px;
      display: inline-block;
      vertical-align: top;
    }
    .content-label {
      width: 80px;
      text-align: right;
      margin-right: 10px;
    }
    .content-input {
      width: 300px;
    }
  }
  
  .btn-container {
    margin-top: 10px;
    margin-right: 5px;
    text-align: right;
    

    > .connect-btn {
      height: 30px;
      width: 130px;
      text-transform: uppercase;
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
