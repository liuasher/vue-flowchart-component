<template>
  <div
    :class="isConnected
      ? 'port-in-dot dot-connected'
      : 'port-in-dot'"
    :id="pid"
    @dragover.prevent=dragPortOver($event)
    @drop.prevent='inDropPort($event)'
    @dragenter="dragEnter"
    @dragleave="dragLeave">

  </div>
</template>
<script>

/**
 * @param
 * 方块顶部，引入连线的那个圆点
 */

export default {
  name: 'InPort',
  data () {
    return {
      className: null
    }
  },
  props: {
    pid: [Number, String],
    content: {
      type: [String, Number],
      default: '输入'
    },
    isConnected: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    /** 拖入，连线接入（也可能是别处的drag drop） */
    inDropPort: function (event) {
      if (this.className) {
        let _this = event.target.parentNode
        _this.className = this.className
      }
      // 获取拖拽数据
      let startData = event.dataTransfer.getData('portStart')
      if (startData) {
        this.$emit('on-add-path', event, startData, this.pid)
      }
    },

    /** 在上面拖拽滑动 */
    dragPortOver: function (event) {

    },

    /** 拖拽 进去 */
    dragEnter: function (event) {
      // 划入时改变父组件class
      let _this = event.target.parentNode
      this.className = _this.className
      _this.className = 'in-port-wrap-drag-in'
    },

    /** 拖拽 离开 */
    dragLeave: function (event) {
      // 划入时改变还原
      let _this = event.target.parentNode
      _this.className = this.className
    }
  }
}
</script>
<style lang="less" scoped>

// 连入点样式
.port-in-dot {
    cursor: default;
    width: 10px;
    height: 10px;
    border: 1px solid gray;
    border-radius: 50%;
    background-color: #fff;
}

// 有线连入的点
.dot-connected {
    width: 0;
    height: 0;
    margin-top: 5px;
    border-style: solid;
    border-width: 6px 5px 0;
    border-color: gray transparent transparent;
    background-color: transparent;
    border-radius: 0;
}

// .sui-task-port-magnet {
//     float: left;
//     width: 20px;
//     height: 20px;
//     margin-top: -6px;
//     margin-left: -6px;
//     background-color: transparent;
//     border-radius: 50%;
//     background: green;
// }

</style>
