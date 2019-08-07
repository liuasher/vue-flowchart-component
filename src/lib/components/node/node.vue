<template>

  <g
    :transform="'translate('+nodeStyle.x+','+nodeStyle.y+')'"
    class="sui-task-node BOOK_MARK">

    <g transform="scale(1,1)">

      <foreignObject :width="width" :height="height">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <div
              @click='selectNodeMethod($event,node, $refs.node)'
              ref="node"
              draggable="true"
              @drag='dragGing($event)'
              @dragstart='dragStart($event)'
              @dragend="dragEnd($event,node)"
              @mouseleave="mouseLeave"
              @contextmenu.prevent="mouseMenu">
              <slot></slot>
            </div>
        </body>
      </foreignObject>

    </g>

  </g>

</template>
<script>
/**
 * @param
 * 基础node，定义了node的拖拽能力，定位更新能力
 */

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Node',
  data () {
    return {
      store: null
    }
  },
  props: {
    width: { type: [String, Number], default: 0 },
    height: { type: [String, Number], default: 0 },
    node: {
      id: [String, Number],
      // positionX: { type: [String, Number], default: 0 },
      // positionY: { type: [String, Number], default: 0 }
      style: Object
    }
  },
  computed: {
    ...mapState('TaskNodeStore', [
      'draggingNode',
      'nodes'
    ]),
    nodeStyle () {
      if (typeof this.node.style === 'string') {
        return JSON.parse(this.node.style)
      } else {
        return this.node.style
      }
    }
  },
  methods: {
    ...mapMutations('TaskNodeStore', [
      'setDraggingNode'
    ]),
    dragStart: function (event) {
      event.dataTransfer.setData('nodedata', JSON.stringify(this.node))
      this.$emit('on-drag-start', event, this.node)

      this.setDraggingNode({
        id: this.node.id,
        style: {
          x: event.clientX,
          y: event.clientY
        }
      })
    },
    dragGing: function (event) {
      this.$emit('on-drag-ging', event)
    },
    dragEnd: function (event, node) {
      if (typeof node.style === 'string') {
        node.style = JSON.parse(node.style)
      }
      // 更新拖拽的node
      this.nodes.forEach((item) => {
        if (item.id === node.id) {
          item.style.x = node.style.x + (event.clientX - this.draggingNode.style.x)
          item.style.y = node.style.y + (event.clientY - this.draggingNode.style.y)
        }
      })
      this.$emit('on-drag-end', event, node)
    },
    mouseMenu: function (event) {
      event.stopPropagation()
      this.$emit('on-mouse', event, this.node)
    },
    selectNodeMethod: function (event, node, ref) {
      this.$emit('on-select', event, node, ref)
    },
    mouseLeave () {
      this.$emit('on-mouse-leave')
    }
  },
  updated: function () {
    // node坐标更新
    this.$emit('updateTem', 'VDom加载完成！')
  }
}
</script>
<style lang="less" scoped>

  .sui-task-node body{
    background-color: transparent;
    overflow: visible;
  }
  .sui-task-node foreignObject{
    background-color: transparent;
    overflow: visible;
  }
  .sui-task-node{
    background-color: red
  }

  .success{
    animation: node-success-animation 2s infinite;
  }
</style>
