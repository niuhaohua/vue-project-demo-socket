import V from '../../main'
  import {
    Message
  } from 'element-ui';
  const dic = {
    state: {
        dicName:null
    },
  
    mutations: {
      SET_DICNAME: (state, dicName) => {
        state.code = dicName
      },
    },
  
    actions: {
      // 参数字段翻译
      getDicName({commit}, pamars) {
        return new Promise((resolve, reject) => {
          V.$api.get('/ocserver/api/dic',pamars , (res) => {
            if (res.code === '200') {
                commit('SET_DICNAME', res.data)
            } else {
              Message({
                type: 'error',
                message: res.msg
              })
            }
      })
    })
    }
  }
}
  export default dic
  