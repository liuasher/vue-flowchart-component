<template>
  <g class="tlin-g" tabindex="0"
    @keydown.delete="deleteNode(portData)"
    @click="setSelected(portData)">
    <!-- 折线 -->
    <path
      :class="conWrapCls"
      ref="wrap"
      :d="drawCurvePath(portData.Mxy, portData.Txy)">
    </path>

    <!-- 折线监听代理 -->
    <path
      class="sui-task-tline-con"
      ref="con"
      :d="lpath"
      :id="generateID"
      @contextmenu.prevent="mouseFn">
    </path>

    <circle r="4" fill="#666">
      <animateMotion dur="5s" repeatCount="indefinite">
        <mpath :xlink:href="'#'+generateID"/>
      </animateMotion>
    </circle>

  </g>
</template>
<script>
import Line from '../../utils/line'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TLine',
  data () {
    return {
      lpath: 'M0 0 Q 0 0, 0 0 T 0 0'
    }
  },
  props: {
    portData: {
      ptype: { type: [String, Number], default: 'Q' },
      dotted: { type: [String, Boolean], default: false },
      Mxy: { x: [String, Number], y: [String, Number] },
      Txy: { x: [String, Number], y: [String, Number] },
      startPort: { type: [String, Number] },
      endPort: { type: [String, Number] },
      'headNid': [String, Number],
      'tailNid': [String, Number],
      'headPortIndex': [String, Number],
      'tailPortIndex': [String, Number]
    },
    deletable: Boolean
  },
  computed: {
    ...mapState('TaskNodeStore', [
      'pathRelated'
    ]),
    // line-wrapper
    conWrapCls () {
      return [
        `sui-task-tline-con-wrap`,
        this.portData.dotted ? `sui-task-tline-dotted` : ``
      ]
    },
    generateID () {
      let M = this.portData.Mxy
      let T = this.portData.Txy
      return `${M.x}-${M.y}^${T.x}-${T.y}`
    },
    // line-hover
    conWrapHoverCls () {
      return [
        `sui-task-tline-hover`
      ]
    }
  },
  mounted: function () {
    // 给代理添加监听，
    let _this = this.$refs.con
    _this.addEventListener('mouseover', () => {
      let wr = this.$refs.wrap
      wr.classList.add(this.conWrapHoverCls)
      this.$emit('on-mouse-over', wr, this.portData)
    })
    _this.addEventListener('mouseout', () => {
      let wr = this.$refs.wrap
      wr.classList.remove(this.conWrapHoverCls)
      this.$emit('on-mouse-out', wr, this.portData)
    })
  },
  methods: {
    ...mapMutations('TaskNodeStore', [
      'setSelectedElement'
    ]),
    ...mapActions('TaskNodeStore', [
      'deleteGlobalPath'
    ]),
    setSelected (node) {
      this.setSelectedElement(node)
    },
    deleteNode (node) {
      console.log(999, this.deletable)
      if (this.deletable) {
        this.deleteGlobalPath(node)
      }
      this.$emit('on-delete-node', node, this.pathRelated)
    },

    /** Line是一个工具类，生成<path>的d属性 */
    drawCurvePath (Mxy, Txy) {
      if (Mxy && Txy) {
        this.lpath = Line.drawCurvePath(Mxy, Txy, this.portData.ptype)
      }
      return this.lpath
    },
    mouseFn (event) {
      event.stopPropagation()
      this.$emit('on-mouse', event, this.portData)
    }
  }
}
</script>
<style lang="less">
.tlin-g{
  outline: none;
}
.sui-task-tline-con{
  fill: none;
  stroke: hsla(0, 0%, 100%, 0);
  stroke-width: 15px;
}
.sui-task-tline-con-wrap {
    fill: none;
    stroke: gray;
    stroke-width: 1px;
}
.sui-task-tline-dotted{
  stroke: rgba(57, 202, 116, 0.8);
  stroke-width: 2px;
  stroke-dasharray: 5;
  -webkit-animation: ant-line 30s infinite linear;
  animation: ant-line 30s infinite linear;
}
.sui-task-tline-hover {
  fill: none;
  stroke: #aeaeae;
  stroke-width: 3px;
}

</style>
