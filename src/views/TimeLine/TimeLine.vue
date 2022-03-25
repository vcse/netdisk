<template>
  <div class="container">

<!--    <FileShow v-if="current" :visible.sync="current"></FileShow>-->

<!--    <context-menu v-if="rightClickFile" :offset="offset" ref="contextmenu" @file:action="action"></context-menu>-->

    <context-menu v-if="menuShow"
                  :offset="offset"
                  ref="contextmenu"
                  @file:action="action"
                  @foo="foo">
    </context-menu>

    <el-timeline v-if="files.length">
      <el-timeline-item v-for="(items, index) of files"
                        :key="index"
                        :timestamp="items[0].file_time"
                        color="orange"
                        placement="top">
        <el-card class="pic-card">
          <div v-for="item of items" :key="item.file_id" class="pic-item">
<!--            <div class="box" @click="current = item" @click.right.prevent="rightClick(item)" @contextmenu="rightClick1">-->
<!--            <div class="box" @click="current = item" @contextmenu="rightClick1" @click="show(item)">-->
            <div class="box" @contextmenu="rightClick1" @click.right.prevent="show(item)">
              <img :src="item.file_mini" alt="pic_show">
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import FileShow from '../../components/file-show/FileShow'
import ContextMenu from '../../components/context-menu/ContextMenu'
export default {
  name: 'TimeLine',
  components: {ContextMenu, FileShow},
  data () {
    return {
      // 全部文件
      files: [],
      page: 0,
      showBig: false,
      menuShow: false,
      // 当前正在展示的图片
      current: null,
      // 右键点击的文件
      rightClickFile: null,
      offset: {
        x: '',
        y: ''
      },
      // 文档高度
      scroll_height: 0,
      // 可视区域高度
      client_height: 0,
      // 已请求后台全部数据
      isAll: false
    }
  },

  mounted () {
    this.$on('fileHandle', this.fileHandle);
    window.addEventListener('scroll', this.scroll);
  },

  methods: {
    closeView() {
      this.showBig = false;
    },

    rightClick1(event) {
      this.menuShow = false;
      this.menuShow = true;
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs.contextmenu.init(event);
      })
    },

    // 监听鼠标右键点击事件
    show(item) {
      this.rightClickFile = item;
    },


    // rightClick(item) {
    //   this.offset.x = event.clientX;
    //   this.offset.y = event.clientY;
    //   this.rightClickFile = item;
    //   this.$nextTick(() => {
    //     this.$refs.contextmenu.init(event);
    //   })
    // },

    foo() { // 取消鼠标监听事件 菜单栏
      this.menuShow = false
      document.removeEventListener('click', this.foo)
    },

    fileHandle(params) {
      const { type, file_id, file_memo, file_folder, folder_name } = params;
      switch (type) {
        case 'delete':
          // 双循环删除
          for (let index in this.files) {
            for (let i in this.files[index]) {
              if (this.files[index][i].file_id === file_id) {
                this.files[index].splice(i, 1);

                // 如果删除的是当日的最后一个文件，则将整个数组从 this.files 移除
                if (this.files[index].length === 0) {
                  this.files.splice(index, 1);
                }
                break;
              }
            }
          }
          break;
        default:
          break;
      }
    },

    async action(type) {
      switch (type) {
        case 'open':
          this.current = this.rightClickFile;
          break;
        case 'delete':
          const config = {
            url: '/data/deleteFile',
            method: 'delete',
            data: {
              file_id: this.rightClickFile.file_id
            }
          }
          const result = await this.$http(config);
          if (result.data.code === 808) {
            // 删除成功时将文件操作发布到事件总线
            this.$emit('fileHandle', {type: 'delete', file_id: this.rightClickFile.file_id})
            this.$message.success('文件删除成功');
          } else {
            this.$message.error('文件删除失败');
          }
          break;
        case 'download':
          // 创建一个 a 元素，填入 href 然后添加自动点击，自行下载
          const a = document.createElement('a');
          a.setAttribute('href', this.rightClickFile.file_src);
          a.click();
          this.$message.success('正在下载中');
          break;
        case 'rename':
          break;
        default:
          console.log('没啥操作了');
          break;
      }
      // 关闭快捷菜单
      this.menuShow = false;
    },

    // 请求初始数据
    async getData() {
      const config = {
        url: '/data/getTimelineDataLimit',
        method: 'get',
        params: {
          page: this.page,
          limit: 5
        }
      }

      const result = await this.$http(config);
      this.page++;
      return result.data.data;
    },

    // 监听页面滚动的回调函数
    async scroll() {
      // 当页面进行了滚动并且读取了全部的数据后
      if (document.documentElement.scrollTop === this.scroll_height - this.client_height && !this.isAll) {
        console.log(document.documentElement.scrollTop);
        console.log(this.scroll_height);
        console.log(this.client_height);
        console.log(this.isAll);
        console.log('y : ', window.scrollY);
        const result = await this.getData();
        console.log('result length : ', result.length);
        console.log('result : ', result);
        if (result.length === 0) {
          this.isAll = true;
          return;
        }

        for (let item of result) {
          this.files.push(item);
        }

        console.log('after : ', this.files);

        // 获取文档高度和可视区高度
        this.$nextTick(() => {
          this.scroll_height = document.documentElement.scrollHeight;
          this.client_height = document.documentElement.clientHeight;
        })
      }
    }
  },

  async created() {
    // 数据初始化
    this.files = await this.getData();
    // 获取文档的高度和可视区域的高度
    this.$nextTick(() => {
      this.scroll_height = document.documentElement.scrollHeight;
      this.client_height = document.documentElement.clientHeight;
    })
  }
}
</script>

<style scoped lang="scss">
/*.el-header {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 60px;*/
/*}*/

/*.el-aside {*/
/*  background-color: #D3DCE6;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 200px;*/
/*}*/

/*.el-main {*/
/*  background-color: #E9EEF3;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 160px;*/
/*}*/

.box {
  width: 150px;
  height: 150px;
  position: relative;
  box-shadow: 0 0 10px #000;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.el-card__body div {
  display: inline-block;
  margin-right: 10px;
}

/*.el-timeline-item {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*}*/

</style>
