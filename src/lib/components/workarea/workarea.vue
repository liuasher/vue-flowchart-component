<template>

  <!-- drop可以统一处理：1.左侧拖入新增，2.右侧拖拽修改 -->
  <div
    class="sui-task-work-area"
    ref="svgArea"
    :style="areaStyles"
    @contextmenu.prevent="mouseMenu"
    @dragover.prevent
    @drop.prevent="onAddNodeModel">

    <!-- <ul class="tools-bar">
      <li>保存</li>
      <li>png</li>
      <li>pdf</li>
    </ul> -->

    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      :id="id">
      <g transform="translate(0,0) scale(1,1)">
        <g>
          <slot></slot>
        </g>
      </g>
    </svg>

  </div>
</template>

<script>

/**
 * @param{ 我是画布 }
 */
import { mapMutations } from 'vuex'

export default {
  name: 'WorkArea',
  data () {
    return {
    }
  },
  props: {
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 0
    },
    id: {
      type: [String, Number]
    }
  },
  computed: {
    areaStyles () {
      let style = {}
      style.width = `${this.width}px`
      style.height = `${this.height}px`
      return style
    }
  },
  methods: {
    ...mapMutations('TaskNodeStore', [
      'addGlobalNode'
    ]),
    mouseMenu: function (event) {
      this.$emit('on-mouse', event, this.id)
    },

    /** 当左侧的组件，被拖拽扔进来时 */
    onAddNodeModel: function (event) {
      let node = event.dataTransfer.getData('nodemodel')
      // 只在新增的时候调用
      if (node) {
        let nodeObj = JSON.parse(node)

        let ref = this.$refs.svgArea
        // let randomID = Math.floor(Math.random() * 100)

        nodeObj.style = {}
        nodeObj.style.x = event.clientX - ref.offsetLeft - 90 - 300 - 54
        nodeObj.style.y = event.clientY - ref.offsetTop - 15 - 50 - 36

        this.addGlobalNode(nodeObj)

        // 通知父亲on-add-nodemodel
        this.$emit('on-add-nodemodel', event, nodeObj)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.sui-task-work-area {
  position: absolute;
  width: 3000px;
  height: 3000px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAT0lEQVQ4T2N8/fr/fwYiADfPP4avX5gIqmQEGSgqyshISOW373//c3EyE1Q3aiDukBwNQ5xhQ/1kAwpsQomaFHnqu3A06+EM/9GcQr+cAgBGqZrSrFyxegAAAABJRU5ErkJggg==');
  background-color: #fff;
  position: relative;
  cursor: -webkit-grab;
}

.tools-bar{
  position: fixed;
  right: 40px;
  top: 20px;
  width: 200px;
  height: 40px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3)
}
</style>
