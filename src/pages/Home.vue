<template>
  <el-container>
    <el-header>
      <h2>Miss Yo</h2>

      <div class="icon-container">
        <el-tooltip class="avatar" effect="dark" content="头像" x-placement="bottom">
          <img src="../assets/logo.png" alt="用户头像">
        </el-tooltip>

        <el-tooltip class="lock" effect="dark" content="锁定" x-placement="bottom">
          <img src="../assets/logo.png" alt="锁定">
        </el-tooltip>

        <el-tooltip class="quit" effect="dark" content="退出" x-placement="bottom">
          <img src="../assets/logo.png" alt="退出">
        </el-tooltip>
      </div>
    </el-header>

    <div class="context-container">
      <div class="outer-sidebar">
        <div class="sidebar">
          <el-menu route>
            <template v-for="(item, index) of menu">
              <router-link :to="item.link" :key="index">
                <el-menu-item :index="index.toString()" route>
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-menu>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>

<!--    <el-container>-->
<!--      <el-aside>-->
<!--        <el-menu route>-->
<!--          <template v-for="(item, index) of menu">-->
<!--            <router-link :to="item.link" :key="index">-->
<!--              <el-menu-item :index="index.toString()" route>-->
<!--                <i :class="item.icon"></i>-->
<!--                <span slot="title">{{item.title}}</span>-->
<!--              </el-menu-item>-->
<!--            </router-link>-->
<!--          </template>-->
<!--        </el-menu>-->
<!--      </el-aside>-->

<!--      <el-main>-->
<!--        <router-view></router-view>-->
<!--      </el-main>-->

<!--    </el-container>-->
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menu: [
        { icon: "mdi-timeline-text", title: "时光轴", link: "/home/timeline" },
        { icon: "mdi-image", title: "照片管理", link: "/home/image" },
        { icon: "mdi-video", title: "视频管理", link: "/home/video" },
        { icon: "mdi-folder", title: "收藏夹", link: "/home/folder" },
        { icon: "mdi-account-cog", title: "个人设置", link: "/home/profile" }
      ]
    }
  },
  methods: {

  },

}
</script>

<style scoped>

.context-container {
  display: flex;
}

.sidebar {
  width: 200px;
  height: 100vh;
  position: fixed;
}

.outer-sidebar {
  width: 200px;
  /*height: 100%;*/
}

.main {
  flex: 1;
}

.el-container {
  display: flex;
  height: 100vh;
}

.el-aside {
  border-right: 1px solid black;
  overflow: hidden;
  position: fixed;
  width: 300px;
  /*height: 100%;*/
}

/*出现双重滚动条时，使用继承*/
.el-main {
  /*overflow: inherit;*/
  flex: 1;
}

.home {
  height: 100vh;
}

.el-header {
  background-color: darkorange;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: space-between;
  position: sticky;
}


.el-header h2 {
  color: white;
  margin-left: 20px;
}

.icon-container {
  /*margin-right: 20px;*/
  margin: auto 0;
}

.container img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  padding-right: 10px;
}

.el-menu {
  width: 200px;
  height: 100vh;
}

.el-menu a {
  text-decoration: none;
}

/*.el-menu a li {*/
/*  !*margin: 10px;*!*/
/*  padding: 0;*/
/*}*/


</style>
