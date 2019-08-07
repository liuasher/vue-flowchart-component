<template>
  <div class="wrapper">
    <ul class="menue">
      <li tag="1">执行</li>
      <li tag="2">暂停</li>
      <li tag="3">删除</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.wrapper{
  position: absolute;
  width: 120px;
  right: -120px;
  top: 0;
}
.menue{
  border: solid 1px #d2caca;
  background: #fff;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 8px;
  padding-inline-start: 0px;
  cursor: pointer;
  li{
    background: transparent;
    padding: 10px;
  }
  li:hover{
    background: #e7f9ff;
  }
}
</style>
