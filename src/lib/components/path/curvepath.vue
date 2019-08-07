<template>
  <g ref="gss">
    <!-- 已完成的连线 -->
    <template v-for="(item, index) in con" >
      <t-line
        class="saved-line"
        v-if="con.length > 0"
        :key="index"
        deletable
        :portData="item"
        @on-mouse="mouseFn"
        @on-delete-node="deleteNode"
        @on-mouse-over="mouseOverFn"
        @on-mouse-out="mouseOutFn">
      </t-line>
    </template>

    <!-- 拖拽中的连线 -->
    <t-line
      class="unsaved-line"
      v-if="path.isShow"
      :portData="path">
    </t-line>

  </g>
</template>
<script>

/**
 * @param{ 我是连线 }
 */

import TLine from './tline.vue'
import { mapState } from 'vuex'
// mapMutations, mapActions

export default {
  components: {TLine},
  name: 'CurvePath',
  props: {
    paths: {
      type: Array
    },
    areaid: [String, Number],
    pathtype: {
      type: [String, Number],
      default: 'Q'
    },
    deletable: Boolean
  },
  data () {
    return {
      con: []
    }
  },
  // mixins: [ mixinsNode ],
  watch: {
    paths (newData, oldData) {
      this.vReload()
    }
  },
  computed: {

    ...mapState('TaskNodeStore', [
      'draggingPath'
    ]),

    /** 拖拽中，还没有push到paths的临时连线 */
    path: function () {
      let pa = this.draggingPath
      let isShow = pa.isShow
      if (pa.Mxy) {
        pa = this.computeXY(pa.Mxy, pa.Txy, true)
      }
      pa.isShow = isShow
      pa.dotted = false
      pa.ptype = this.pathtype
      return pa
    }
  },
  mounted: function () {
    this.vReload()
  },
  methods: {
    vReload () {
      this.con = []
      /** 遍历props传入的paths，加工后推入con渲染 */
      this.paths.forEach((o) => {
        let target = JSON.parse(JSON.stringify(o))
        // { dotted: true, ptype: 'L', startPort: 'node1_4', endPort: 'node2_1' }
        let vstart = document.getElementById(o.startPort)
        let vend = document.getElementById(o.endPort)
        if (vend && vstart) {
          let obj = this.computeXY(vstart, vend, false)
          obj = {...obj, ...target}
          if (o.dotted) {
            obj.dotted = o.dotted
          }
          if (o.ptype) {
            obj.ptype = o.ptype
          }
          obj.startPort = o.startPort
          obj.endPort = o.endPort
          this.con.push(obj)
        }
      })
    },

    /** getBoundingClientRect() 元素的四条边，距离视口的（top，left）的距离 */
    computeXY (vstart, vend, isBing) {
      let area = document.getElementById(this.areaid)
      let obj = {}
      /** vstart,vend是连线 开始节点，结束节点 */
      if (isBing) {
        obj = {
          Mxy: {
            x: vstart.x - area.getBoundingClientRect().left,
            y: vstart.y - area.getBoundingClientRect().top
          },
          Txy: {
            x: vend.x - area.getBoundingClientRect().left,
            y: vend.y - area.getBoundingClientRect().top
          }
        }
      } else {
        obj = {
          Mxy: {
            x: vstart.getBoundingClientRect().left - area.getBoundingClientRect().left + 5,
            y: vstart.getBoundingClientRect().top - area.getBoundingClientRect().top + 5
          },
          Txy: {
            x: vend.getBoundingClientRect().left - area.getBoundingClientRect().left + 4,
            y: vend.getBoundingClientRect().top - area.getBoundingClientRect().top + 0
          }
        }
      }
      return obj
    },
    /** 鼠标 右键 曲线 */
    mouseFn (event, portData) {
      this.$emit('on-mouse', event, portData)
    },
    /** 鼠标 划入 曲线 */
    mouseOverFn (event, portData) {
      this.$emit('on-mouse-over', event, portData)
    },
    /** 鼠标 划出 曲线 */
    mouseOutFn (event, portData) {
      this.$emit('on-mouse-out', event, portData)
    },
    deleteNode (path, nodes) {
      this.$emit('on-delete-node', path, nodes, 'LINE')
    }
  }
}
</script>
