<template>
  <div class="container">
    <el-dialog :visible.sync="visible"
               :show-close="false" width="600px"
               :modal="true"
               @click.self="outClick"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
<!--      <img :src="file" alt="">-->
      <el-button @click="outClick">x</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FileShow',
  props: {
    file: Object,
    visible: {
      type: Object,
      default: null
    }
  },
  methods: {
    outClick () {
      this.$emit('update:file', null);
    }
  },
  watch: {
    file(value) {
      console.log(value);
    }
  },

}
</script>

<style scoped>
.container {
  height: 45vh;
  width: 85vw;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
