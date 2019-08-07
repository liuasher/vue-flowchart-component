<template>
  <!-- 给节点包裹一次wrapper -->
  <div
    :style="nodeStyles"
    class="sui-task-node-model"
    draggable="true"
    @dragstart='dragStart($event)'>
    <slot></slot>
  </div>
</template>
<script>

/**
 * @param
 * 左侧的拖拽列表
 */

export default {
  name: 'NodeModel',
  props: {
    node: {
      id: [String, Number],
      name: {
        type: [String, Number],
        default: '节点'
      }
    },
    width: {
      type: [String, Number],
      default: 140
    },
    height: {
      type: [String, Number],
      default: 26
    }
  },
  data () {
    return {
      store: null
    }
  },
  computed: {
    nodeStyles () {
      let style = {}
      style.width = `${this.width}px`
      style.height = `${this.height}px`
      return style
    }
  },
  methods: {
    dragStart: function (event) {
      event.dataTransfer.setData('nodemodel', JSON.stringify(this.node))
    }
  }
}
</script>
<style scoped>
.sui-task-node-model {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    border-radius: 13px;
    border: 1px solid transparent;
    cursor: -webkit-grab;
}
</style>
