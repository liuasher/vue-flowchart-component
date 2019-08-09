<template>
  <div id="app" class="app">

      <!-- 顶部 -->
      <div class="app-top">
        <span class="top-left">
          <span class="title">vue-flow-chart</span>
        </span>
        <span class="top-right">
          <span>
            <i class="iconfont icon-bianji setting"/>
          </span>
        </span>
      </div>

      <div class="app-container">

          <!-- 组件 -->
          <div class="app-left">
            <ul class="left-lists">
              <li v-for="nodeM in nodeModels"
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

            </ul>
          </div>

          <!-- 画板 -->
          <div class="app-right">

            <!-- 画布 -->
            <div class="canvas">
              <task-work-area
                width="1000"
                height="800"
                :id="work_id"
                @on-add-nodemodel="onAddNodeModel"
                @on-mouse="mouseMenu"
                ref="area">

                <!-- 连线 -->
                <task-curve-path :areaid="work_id" ref="curve"
                  deletable :paths="paths" class="canvas-path"
                  @on-mouse="mouseFn"
                  @on-delete-node="deleteNode"
                  @on-mouse-over="mouseOverFn"
                  @on-mouse-out="mouseOutFn"/>

                <!-- 节点 -->
                <template v-for="node in nodes">
                  <task-common-node class="canvas-node" :key="node.id"
                    :node="node" deletable
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
          </div>

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
    let nodes = [{'id': 128, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': {'x': 591, 'y': 145, 'inPort': [0], 'outPort': [0]}, 'parameters': '{"featuresCol":"features","labelCod":"label","predictionCol":"prediction","probabilityCol":"probability","rawPredictionCol":"raw_prediction","smoothing":1,"modelType":"multinomial","thresholds":null,"metrics":[]}', 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '128_e0', 'isConnected': true}], 'outPorts': [{'id': '128_s0', 'isConnected': false}]}, {'id': 133, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': {'x': 42, 'y': 406, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '133_e0', 'isConnected': true}], 'outPorts': [{'id': '133_s0', 'isConnected': false}]}, {'id': 138, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': {'x': 401, 'y': 22, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '138_e0', 'isConnected': false}], 'outPorts': [{'id': '138_s0', 'isConnected': false}]}, {'id': 139, 'name': '节点', 'componentId': 7, 'experimentId': 19, 'style': {'x': 244, 'y': 218, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '139_e0', 'isConnected': false}], 'outPorts': [{'id': '139_s0', 'isConnected': true}]}, {'id': 140, 'name': '节点', 'componentId': 7, 'experimentId': 19, 'style': {'x': 755, 'y': 275, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '140_e0', 'isConnected': true}], 'outPorts': [{'id': '140_s0', 'isConnected': false}]}, {'id': 144, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': {'x': 487, 'y': 418, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '144_e0', 'isConnected': true}], 'outPorts': [{'id': '144_s0', 'isConnected': false}]}, {'id': 145, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': {'x': 358, 'y': 537, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '145_e0', 'isConnected': true}], 'outPorts': [{'id': '145_s0', 'isConnected': false}]}, {'id': 146, 'name': '节点', 'componentId': 5, 'experimentId': 19, 'style': {'x': 443, 'y': 272, 'inPort': [0], 'outPort': [0]}, 'parameters': null, 'status': 0, 'input': '', 'output': '', 'inPorts': [{'id': '146_e0', 'isConnected': true}], 'outPorts': [{'id': '146_s0', 'isConnected': false}]}]
    let paths = [{'id': 29, 'headNid': 139, 'tailNid': 144, 'headPortIndex': 0, 'tailPortIndex': 0, 'startPort': '139_s0', 'endPort': '144_e0'}, {'dotted': false, 'ptype': 'Q', 'startPort': '128_s0', 'endPort': '146_e0'}, {'dotted': false, 'ptype': 'Q', 'startPort': '128_s0', 'endPort': '140_e0'}, {'dotted': false, 'ptype': 'Q', 'startPort': '138_s0', 'endPort': '128_e0'}, {'dotted': false, 'ptype': 'Q', 'startPort': '139_s0', 'endPort': '133_e0'}, {'dotted': false, 'ptype': 'Q', 'startPort': '133_s0', 'endPort': '145_e0'}]

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
  .app{

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width:100%;
    height:100%;

    .app-top{
      width: 100%;
      height: 50px;
      position: absolute;
      z-index: 99;
      left: 0;
      right: 0;
      top: 0;
      box-shadow: 0 2px 8px #f0f1f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left{
        margin-left: 20px;
        .title{
          font-weight: 400;
          font-size: 18px;
        }
      }
      .top-right{
        margin-right: 20px;
        .setting{
          font-size: 20px;
          cursor: pointer;
        }
      }
    }

    .app-container{
      position: absolute;
      top: 50px;
      display: flex;
      bottom: 0;
      left: 0;
      right: 0;
      .app-left{
        width: 200px;
        height: 100%;
        overflow: auto;
        // border-right: 1px solid #e8e8e8;
        color: #314659;
        font-size: 14px;
        .left-lists{
          li{
            border-bottom: solid 1px #eeeeee;
            height: 40px;
            text-indent: 20px;
            line-height: 40px;
          }
        }
      }
      .app-right{
        flex-grow: 1;
        width: 0;
        height: 100%;
        overflow: auto;
        position: relative;
        .canvas{
          width: 100%;
          height: 100%;
          position: relative;
        }
      }
    }

  }
</style>
