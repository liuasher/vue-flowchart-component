<template>
  <div
    class="sui-task-port sui-task-port-out"
    :id="pid"
    @drag.stop='dragPortGing($event)'
    @dragstart.stop='dragPortStrat($event)'
    @dragend.stop="dragPortEnd($event)"
    draggable="true">

  </div>
</template>
<script>

/**
 * @param
 * 方块底部，引出连线的那个圆点
 */

import { mapMutations } from 'vuex'
// mapState, mapMutations, mapActions

export default {
  name: 'OutPort',
  data () {
    return {
      Mxy: null
    }
  },
  props: {
    pid: [Number, String],
    content: {
      type: [String, Number],
      default: '输出'
    }
  },
  methods: {
    ...mapMutations('TaskNodeStore', [
      'setDraggingPath'
    ]),
    /** 开始拖拽连线的时候 */
    dragPortStrat: function (event) {
      /** clientX/Y 相对于视口左上方的距离 */
      this.Mxy = {
        x: event.clientX,
        y: event.clientY
      }
      if (event.dataTransfer.addElement) {
        let div = document.createElement('div')
        div.setAttribute('style', `with:10px; height:10px; background-color:red`)
        event.dataTransfer.addElement(div)
      } else {
        var img = new Image()
        img.src = './static/img/outicon.png'
        event.dataTransfer.setDragImage(img, 8, 3)
      }
      event.dataTransfer.setData('portStart', this.pid)
    },

    /** 正在拖拽连线的时候 */
    dragPortGing: function (event) {
      let Txy = {
        x: event.clientX,
        y: event.clientY
      }

      this.setDraggingPath({
        Mxy: this.Mxy,
        Txy: Txy,
        isShow: true
      })

      // this.$store.dispatch('setPathData', {
      //   Mxy: this.Mxy,
      //   Txy: Txy,
      //   isShow: true
      // })
    },

    /** 拖拽结束 */
    dragPortEnd: function (event) {
      this.setDraggingPath({
        isShow: false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sui-task-port {
    width: 10px;
    height: 10px;
    float: right;
    margin-right: -5px;
    border: 1px solid gray;
    border-radius: 50%;
    background-color: #fff;
}
.sui-task-port-out {
    cursor: crosshair;
}
// .sui-task-port-magnet {
//     float: left;
//     width: 20px;
//     height: 20px;
//     margin-top: -6px;
//     margin-left: -6px;
//     background-color: transparent;
//     border-radius: 50%;
// }
</style>
