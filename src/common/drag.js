export default (Vue) => {
  Vue.directive("drags", {
    inserted: function (el) {
      let oDiv = el   // 获取当前元素
      oDiv.onmousedown = (e) => {
        // 算出鼠标相对元素的位置
        let disX = e.clientX - oDiv.offsetLeft
        let disY = e.clientY - oDiv.offsetTop
        document.onmousemove = (e) => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX
          let top = e.clientY - disY
          oDiv.style.left = left + 'px'
          oDiv.style.top = top + 'px'
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
}

