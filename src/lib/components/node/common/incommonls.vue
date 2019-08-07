<template>
  <div
    v-if="in_ports && in_ports.length > 0"
    class="in-port-container"  ref="port">

    <!-- <template
      v-for="(item,index) in in_ports">
       -->
      <div
        v-for="(item,index) in in_ports"
        class="in-port-wrap"
        :key='index'>
        <in-port
          :pid="item.id"
          @on-add-path='addPath'
          :isConnected = "item.isConnected"/>
      </div>

    <!-- </template> -->

    <!-- <div class="in-port-wrap"></div> -->

  </div>
</template>
<script>

/**
 * @param
 * 方块顶部，引入连线的组件
 */

import InPort from '../../port/inport.vue'

export default {
  components: {InPort},
  name: 'InCommonLs',
  props: {
    in_ports: {
      type: Array
    }
  },
  methods: {
    addPath: function (event, start, end) {
      this.$emit('on-add-path', event, start, end)
    }
  }
}
</script>
<style lang="less" scoped>

.in-port-container{
  display: flex;
  justify-content: space-around;
  clear: both;
  float: left;
  width: 100%;
}

// 每一个连线节点单位
.in-port-wrap{
  width: 10px;
  height: 0;
  background: red;
  margin-top: -5px;
}

// 当in-port有拖入时，改变wrapper样式
.in-port-wrap-drag-in{
  background: green;
  margin-top: -5px;
  -webkit-box-shadow: 0px 0px 1px 3px #57a3f3;
          box-shadow: 0px 0px 1px 3px #57a3f3;
          border-radius: 50%;
}

</style>
