<template>
  <div
    v-if="out_ports && out_ports.length > 0"
    class="out-port-container">

    <!-- <template
      v-for="(item,index) in out_ports">
      -->
      <div
        v-for="(item, index) in out_ports"
        class="out-port-wrap"
        :key='index'>
        <out-port
          :pid="item.id"></out-port>
      </div>
    <!-- </template> -->

    <!-- <div class="out-port-wrap"></div> -->
  </div>
</template>
<script>

/**
 * @param
 * 方块底部，引出连线的组件
 */

import OutPort from '../../port/outport.vue'

export default {
  components: {
    OutPort
  },
  name: 'OutCommonLs',
  props: {
    out_ports: {
      type: Array
    }
  }
}
</script>
<style lang="less" scoped>
.out-port-container {
    // display: flex;
    // height: 1px;
    // background: red;
    // position: absolute;
    // z-index: 600;
    // bottom: 0;
    // width: 100%;
    // justify-content: space-around;

    display: flex;
    justify-content: space-around;
    clear: both;
    float: left;
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 0;
}

.out-port-wrap {
    width: 0px;
    height: 0;
    background: red;
    margin-top: -5px;
}
</style>
