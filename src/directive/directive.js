import Vue from 'vue'
Vue.directive('demo', {
  inserted: function(el, binding, vsNode) {
    const f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
      console.log('11111111')
      console.log(el.scrollHeight)
    }
    window.addEventListener('scroll', f)
    console.log(el.scrollHeight)
    el.onscroll(function() {
      console.log('11111111111')
    })
    el.onclick(function() {
      console.log('11111点击')
    })
  }
})
