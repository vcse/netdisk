<template>
  <div class="contextmenu">
    <ul>
<!--      <li v-for="(item, index) of menuList" @click="handle(item.fn)" :key="index">{{item.title}}</li>-->
      <li @click="handle('open')">打开</li>
      <li @click="handle('rename')">重命名</li>
      <li @click="handle('delete')">删除</li>
      <li @click="handle('download')">下载</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    offset: Object,
    menuList: [
      { icon: "mdi-folder-open", title: "打开", color: "blue accent-4", fn: "open" },
      { icon: "mdi-rename-box", title: "重命名", color: "orange darken-1", fn: "rename" },
      { icon: "mdi-delete-forever", title: "删除", color: "red darken-3", fn: "delete" },
      { icon: "mdi-cloud-download", title: "下载", color: "green darken-3", fn: "download" }
    ]
  },

  methods: {
    handle (fn) {
      this.$emit('file:action', fn);
    },

    init(event) {
      let menu = document.querySelector('.contextmenu');
      let cha = document.body.clientHeight - event.clientY
      // console.log(document.body.clientHeight,event.clientY,cha)
      // 防止菜单太靠底，根据可视高度调整菜单出现位置
      if (cha < 150) {
        menu.style.top = event.clientY -120 + 'px'
      } else {
        menu.style.top = event.clientY -10 + 'px'
      }
      menu.style.left = event.clientX + 10 + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    },

    foo () {
      this.$emit('foo')
    },

    listenerScroll() {

    }
  },

  mounted() {
    // 获取浏览器可视区宽高
    this.client_width = document.documentElement.clientWidth
    this.client_height = document.documentElement.clientHeight
    window.addEventListener("scroll", this.listenerScroll)
  },

  watch: {
    offset(n, o) {
      console.log(n, o);
    }
  }
}
</script>

<style scoped>
.contextmenu {
  position: absolute;
  background-color: #ecf5ff;
  width: 100px;
  /*height: 106px;*/
  font-size: 12px;
  color: #409EFF;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(64,158,255,.2);
  white-space: nowrap;
  z-index: 1000;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  /*margin: 0;*/
  /*padding: 0;*/
  padding: 5px 10px;
  list-style: none;
  display: block;
  text-align: center;
}

li:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>
