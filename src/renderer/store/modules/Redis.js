const state = {
  selectedConnect: null // 커넥션을 맺기 위해 현재 선택된 객체, connect 버튼 클릭시 저장
}

const mutations = {
  updateSelectedConnect (state, { connect }) {
    state.selectedConnect = connect
  }
}

const actions = {
  onClickConnect ({ commit }, opt) {
    commit('updateSelectedConnect', opt)
  }
}

export default {
  state,
  mutations,
  actions
}
