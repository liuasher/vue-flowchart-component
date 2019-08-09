<template>

  <node
    :node="node"
    width=180
    height=30
    @on-select="selectNodeMethod"
    @on-drag-ging="dragGing"
    @on-drag-start="dragStart"
    @on-drag-end="dragEnd"
    @updateTem="updated"
    @on-mouse-leave="mouseLeave"
    @on-mouse="mouseMenu">
    <div
      class="common-node"
      :style="nodesStyle">

      <div v-show="showMenu">
        <slot></slot>
      </div>

      <div
        tabindex="0"
        @keydown.delete="deleteNode(node)"
        class="flex-wrap"
        @click="setSelected(node)">

        <!-- 节点图标 -->
        <span
          :class="
            ' iconfont ' +
            [ node.icon ? node.icon : 'icon-tubiao-bingtu' ] +
            ' success '">
        </span>

        <!-- 节点名 -->
        <span
          class="sui-task-common-node-name">
          <!-- {{node.name}} -->
          {{ node.name }}
        </span>

        <!-- 节点状态 -->
        <span
          :class="'sui-task-common-node-status' + ' ' + stateCls(node.state)">
        </span>
      </div>

      <!-- 顶部，只能从别处引入的点 -->
      <in-common-ls
        :in_ports="node.inPorts"
        @on-add-path='addPath'/>

      <!-- 底部，只能向别处引出的点 -->
      <out-common-ls
        :out_ports="node.outPorts"/>

    </div>
  </node>
</template>
<script>

/**
 * @param
 * 每个拖拽组件的最大单元，由基础node包裹
 *  - in-common-ls
 *  - out-common-ls
 */

import Node from '../node.vue'

import InPort from '../../port/inport.vue'
import OutPort from '../../port/outport.vue'
import InCommonLs from './incommonls.vue'
import OutCommonLs from './outcommonls.vue'

// import mixinsNode from '../../../mixins/node'
import { mapState, mapMutations, mapActions } from 'vuex'

import NodeInfo from '../../../../size'

export default {
  components: {
    OutCommonLs,
    InCommonLs,
    OutPort,
    InPort,
    Node
  },
  // mixins: [ mixinsNode ],
  name: 'CommonNode',
  data () {
    return {
      state: '',
      showMenu: false
    }
  },
  props: {
    node: {
      id: [String, Number],
      name: { type: [String, Number], default: '节点' },
      // positionX: { type: [String, Number], default: 0 },
      // positionY: { type: [String, Number], default: 0 },
      style: Object,
      icon: [String, Number],
      state: { type: [String, Number], default: 'ready' },
      inPorts: { type: Array, default: [] },
      outPorts: { type: Array, default: [] },

      /** 节点类型，与size.js对应，获取样式用的 */
      NodeType: String

    },
    deletable: Boolean,
    updateTem: Function
  },
  mounted () {

  },
  computed: {
    ...mapState('TaskNodeStore', [
      'selectedElement',
      'nodes',
      'paths',
      'pathRelated'
    ]),
    nodesStyle () {
      if (!this.node.NodeType) {
        return {}
      } else {
        return NodeInfo[this.node.NodeType]
      }
    }
  },
  methods: {
    ...mapMutations('TaskNodeStore', [
      'setSelectedElement',
      'addGlobalPath'
    ]),
    ...mapActions('TaskNodeStore', [
      'deleteGlobalNode'
    ]),
    setSelected (node) {
      this.setSelectedElement(node)
    },
    deleteNode (node) {
      if (this.deletable) {
        this.deleteGlobalNode(node)
      }
      this.$emit('on-delete-node', node, {}, 'NODE')
    },
    updated (val) {
      this.updateTem()
    },
    selectNodeMethod: function (event, node, ref) {
      this.$emit('on-select', event, node, ref)
    },
    dragStart: function (event, node) {
      // let nodeData = event.dataTransfer.getData('nodedata')
      this.$emit('on-drag-start', event, node)
    },
    dragGing: function (event) {
      this.$emit('on-drag-ging', event)
    },
    dragEnd: function (event, node) {
      this.$emit('on-drag-end', event, node)
    },
    addPath: function (event, startData, endData) {
      this.nodes.forEach(item => {
        item.inPorts.forEach(ins => {
          if (ins.id === endData) {
            ins.isConnected = true
          }
        })
      })
      this.addGlobalPath({
        dotted: false,
        ptype: 'Q',
        startPort: startData,
        endPort: endData
      })

      console.log(444444, this.pathRelated)
      this.$emit('on-add-path', event, startData, endData, this.pathRelated)
    },
    mouseMenu: function (event, node) {
      this.showMenu = true
      this.$emit('on-mouse', event, node)
    },
    mouseLeave () {
      this.showMenu = false
    },
    stateCls (value) {
      switch (value) {
        case 'success':
          return 'task-icon-ok'
        case 'running':
          return 'task-icon-run'
        case 'ready':
          return 'task-icon-wait'
        case 'mistake':
          return 'task-icon-error'
        default:
          return 'task-icon-wait'
      }
    }
  },
  updated: function () {
    this.updateTem()
  }
}
</script>
<style lang="less" scoped>

// node的样式
.common-node {
    width: 180px;
    height: 30px;
    background-color:transparent;
    border: 1px solid #7db2d4;
    border-radius: 4px;
    font-size: 12px;
    position: relative;
    // -webkit-transition: background-color 0.2s;
    // transition: background-color 0.2s;
}

// 选择栏
.flex-wrap{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 500;
  outline: none;
}
// 节点图标
.iconfont {
  float: left;
  font-size: 16px;
  margin-left: 2px;
  border-radius: 2px;
  background-color: #eeebeb;
  width: 26px;
  height: 26px;
  text-align:center;
  line-height: 26px;
}

.sui-task-common-node-name {
    float: left;
    margin-left: 2px;
    width: 120px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}
.sui-task-common-node-status {
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    margin: 1px;
    border-radius: 100%;
    float: right;
    font-size: 18px;
}
.sui-task-common-node:hover{
    cursor: grab;
    background-color: rgba(227, 244, 255, 0.9)
}

</style>
