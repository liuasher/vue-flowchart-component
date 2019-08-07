<template>
  <div id="app" class="sui-app">

      <!-- 组件 -->
      <div class="sui-cell-left">
        <ul>
          <li style="border-bottom: 2px solid aliceblue;"
            v-for="nodeM in nodeModels"
            :key="nodeM.id">

            <!-- 左侧选择列表 -->
            <task-node-model
              :node="nodeM">
              <span
                class="sui-task-node-model-label">
                {{nodeM.name}}
              </span>
            </task-node-model>

          </li>
          <li>
            node info: {{ selectedElement.id }}
          </li>
        </ul>
      </div>

      <!-- <div>{{ $store }}</div> -->

      <!-- 画板 -->
      <div class="sui-cell-right canvas">
        <task-work-area
          width=1000
          height=500
          :id="work_id"
          @on-add-nodemodel="onAddNodeModel"
          @on-mouse="mouseMenu"
          ref="area">

          <!-- 连线 -->
          <task-curve-path
            :areaid="work_id"
            deletable
            :paths="paths"
            ref="curve"
            class="canvas-path"
            @on-mouse="mouseFn"
            @on-delete-node="deleteNode"
            @on-mouse-over="mouseOverFn"
            @on-mouse-out="mouseOutFn"/>

          <!-- 节点 -->
          <template
            v-for="node in nodes">
            <task-common-node
              class="canvas-node"
              :key="node.id"
              :node="node"
              deletable
              @click="clickNode(node)"
              @on-add-path="addPath"
              @on-select.capture="selectlMethod"
              @on-drag-start="dragStart"
              @on-drag-ging="dragGing"
              @on-drag-end="dragEnd"
              @on-delete-node="deleteNode"
              :updateTem="updateCompleted"
              @on-mouse="mouseNodeMenu">

              <task-menu @click-menu="selectMenue"/>
            </task-common-node>
          </template>

        </task-work-area>

      </div>

      <div class="info-board">
        <div>{{currentDeletedNode}}</div>
        ------------------------------------------
        <div>{{currentDeletedPaths}}</div>
      </div>

    </div>

</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      work_id: 'work_id',

      /** 组件lists */
      nodeModels: [
        {
          id: '12',
          name: 'SQL'
        }, {
          id: '13',
          name: 'WorkData'
        }, {
          id: '14',
          name: 'TableToTV'
        }, {
          id: '15',
          name: '增加系列'
        }
      ]

    }
  },
  computed: {
    /**  */
    ...mapState('TaskNodeStore', [
      'checkedExperiment',
      'nodes',
      'paths',
      'draggingNode',
      'selectedElement',
      'currentDeletedNode',
      'currentDeletedPaths'
    ])

  },
  mounted () {
    let nodes = [{'id': 128, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': '{"x":681,"y":134,"inPort":[0],"outPort":[0]}', 'parameters': '{"featuresCol":"features","labelCod":"label","predictionCol":"prediction","probabilityCol":"probability","rawPredictionCol":"raw_prediction","smoothing":1,"modelType":"multinomial","thresholds":null,"metrics":[]}', 'status': 0, 'input': '', 'output': ''}, {'id': 133, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': '{"x":94,"y":417,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}, {'id': 138, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': '{"x":409,"y":86,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}, {'id': 139, 'name': '节点', 'componentId': 7, 'experimentId': 19, 'style': '{"x":136,"y":237,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}, {'id': 140, 'name': '节点', 'componentId': 7, 'experimentId': 19, 'style': '{"x":80,"y":94,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}, {'id': 144, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': '{"x":516,"y":493,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}, {'id': 145, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': '{"x":358,"y":537,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}, {'id': 146, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': '{"x":540,"y":312,"inPort":[0],"outPort":[0]}', 'parameters': null, 'status': 0, 'input': '', 'output': ''}]

    let paths = [{'id': 29, 'headNid': 139, 'tailNid': 144, 'headPortIndex': 0, 'tailPortIndex': 0}]

    this.setGlobal({nodes, paths})
  },
  methods: {
    ...mapActions('TaskNodeStore', [
      'setGlobalRollBack',
      'setGlobal'
    ]),

    /** 点击右键菜单 */
    selectMenue (event, node) {
      console.log('点击了菜单', event.attributes.tag.value, node)
    },

    /** 删除元素 */
    deleteNode (node, paths, type) {
      console.log('删除元素', node, paths, type)
    },
    /** 增加节点 */
    onAddNodeModel (event, node) {
      console.log('添加节点', event.clientX, event.clientY, node)
    },

    /** 鼠标 右键 曲线 */
    mouseFn (event, portData) {
      console.log('mouseFn', 'on-mouse', '鼠标右击路径事件', event, portData)
    },
    /** 鼠标 划入 曲线 */
    mouseOverFn (event, portData) {
      console.log('mouseFn', 'on-mouse-over', '鼠标划入路径事件', event, portData)
    },
    /** 鼠标 划出 曲线 */
    mouseOutFn (event, portData) {
      console.log('mouseFn', 'on-mouse-out', '鼠标划出路径事件', event, portData)
    },

    /** 节点 拖拽开始 */
    dragStart: function (event, node) {
      console.log('节点开始移动', event.clientX, event.clientY, node)
    },
    /** 节点 拖拽中 */
    dragGing: function (event) {
      // console.log('节点移动中...', event.clientX, event.clientY)
    },
    /** 节点 拖拽结束 */
    dragEnd: function (event, node) {
      console.log('节点移动结束', node.style.x, node.style.y)
    },

    /** 节点 左键点击 */
    selectlMethod: function (event, data, node) {
      console.log('selectlMethod', 'on-select', '节点左键点击事件', event, data, node)
    },
    /** 节点 右键点击 */
    mouseNodeMenu: function (event, node) {
      console.log('mouseNodeMenu', 'on-mouse', '节点右击事件', event, node)
    },
    /** 增加连线 */
    addPath: function (event, startData, endData, nodes) {
      console.log(123, nodes)
    },

    updateCompleted: function () {
      // console.log('updateCompleted!!')
      // 重新加载路径
      this.$refs.curve.vReload()
    },
    mouseMenu: function (event, id) {
      console.log('mouseMenu', 'on-mouse', '工作区右击事件', event, id)
    }

  }
}
</script>

<style lang="less" scoped>
  .sui-app{
    background-color: #eee;
    width: 140px;
    height: 500px;
    .sui-cell-left{
      position: absolute;
      left: 0;
    }
    .sui-cell-right{
      position: absolute;
      top: 20px;
      right: 20px;
      width: 1000px;
      height: 600px;
      border: solid 1px #c1c1c1;
      border-radius: 4px;
      overflow: scroll;
    }
  }

  .info-board{
    position: absolute;
    width: 300px;
    height: 300px;
    bottom: 0;
    left: 0;
  }
  // .sui-task-node-model-label {
  //   height: 26px;
  //   line-height: 26px;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  // }

</style>
