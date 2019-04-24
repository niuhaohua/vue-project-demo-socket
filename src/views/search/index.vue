<template>
  <div class="app-container">
    <div class="filter-container">
      <span class="shouru">
        <span>公司名称</span>
        <el-input
          v-model="name"
          class="filter-item"
          size="mini"
          style="width: 230px"
          placeholder="请输入内容公司名称"
        />
      </span>
  
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        style="margin-right:25px"
      >全选</el-checkbox>
      <el-checkbox-group class="checkbox-group" v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>

      <span>
        <el-button
          style="margin-left:30px;"
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="search"
          :disabled="disabled"
        >搜索</el-button>
      </span>
    </div>
    <div>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <transition-group appear>
              <el-card v-for="(item,key) in list" v-if="(key+1)%3 == 1" class="box-card" :key="key">
                <div slot="header" class="clearfix header">
                  <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>
                  <span>{{item.category}}</span>
                  <!-- <span
              style="float: right; margin-right:40px; padding: 3px 0"
              type="text"
                  >{{item.datetime}}</span>-->
                </div>
                <div v-if="Array.isArray(item.list) && item.list.length > 0">
                  <div v-for="itemArr in item.list" class="text itemBox">
                    <div
                      v-for=" (listItem,keyItem) in itemArr"
                      :key="keyItem"
                      class="text item"
                    >{{keyItem}}{{'：'+listItem}}</div>
                  </div>
                </div>
                <div v-if="Array.isArray(item.list) && item.list.length == 0">
                  <div class="text itemBox">
                    <div class="text item">暂无数据</div>
                  </div>
                </div>
              </el-card>
            </transition-group>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <transition-group appear>
              <el-card v-for="(item,key) in list" v-if="(key+1)%3 == 2" class="box-card" :key="key">
                <div slot="header" class="clearfix header">
                  <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>
                  <span>{{item.category}}</span>
                  <!-- <span
              style="float: right; margin-right:40px; padding: 3px 0"
              type="text"
                  >{{item.datetime}}</span>-->
                </div>
                <div v-if="Array.isArray(item.list) && item.list.length > 0">
                  <div v-for="itemArr in item.list" class="text itemBox">
                    <div
                      v-for=" (listItem,keyItem) in itemArr"
                      :key="keyItem"
                      class="text item"
                    >{{keyItem}}{{'：'+listItem}}</div>
                  </div>
                </div>
                <div v-if="Array.isArray(item.list) && item.list.length == 0">
                  <div class="text itemBox">
                    <div class="text item">暂无数据</div>
                  </div>
                </div>
              </el-card>
            </transition-group>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <transition-group appear>
              <el-card v-for="(item,key) in list" v-if="(key+1)%3 == 0" class="box-card" :key="key">
                <div slot="header" class="clearfix header">
                  <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>
                  <span>{{item.category}}</span>
                  <!-- <span
              style="float: right; margin-right:40px; padding: 3px 0"
              type="text"
                  >{{item.datetime}}</span>-->
                </div>
                <div v-if="Array.isArray(item.list) && item.list.length > 0">
                  <div v-for="itemArr in item.list" class="text itemBox">
                    <div
                      v-for=" (listItem,keyItem) in itemArr"
                      :key="keyItem"
                      class="text item"
                    >{{keyItem}}{{'：'+listItem}}</div>
                  </div>
                </div>
                <div v-if="Array.isArray(item.list) && item.list.length == 0">
                  <div class="text itemBox">
                    <div class="text item">暂无数据</div>
                  </div>
                </div>
              </el-card>
            </transition-group>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import store from './../../store/index'

// const cityOptions = ['工商', '司法', '风险', '发票','海关','新闻舆情','行政信息','企业破产重组','上市公司信息','外汇交易信息','公司职位发布信息','知识产权','企业职位发布信息','资质证书','信贷中介','税务']

const cityOptions = ['工商','海关']
  
                                                                                                                                                                                   
                                                                                                                                                                                    
                                                                                                                                                                                    
export default {
  name: 'Search',
  components: {
    GithubCorner
  },
  data() {
    return {
      loading: true,
      show2: true,
      list: [],
      name: '新余钢铁股份有限公司',
      socket: null,
      disabled: false,

      checkAll: true,
      checkedCities: ['工商','海关'],
      cities: cityOptions,
      isIndeterminate: false
    }
  },
  created() {
    this.$store.dispatch('getDicName', '')
  },
  mounted() {
    this.$socket.on('enterDetails', data => {
      data = JSON.parse(data)
      if (data.statusCode === '200') {
        this.list.push(data.data)
      } else if (data.statusCode === '204') {
        let timer = setInterval(() => {
          this.$message.closeAll()
          this.$message({
            type: 'success',
            message: '数据已加载完毕'
          })
          this.disabled = false
          clearInterval(timer)
        }, 1500)
      } else {
        this.disabled = false
        this.$message({
          type: 'error',
          message: '服务器错误，请联系管理员'
        })
      }
    })
    this.search()
  },
  methods: {
    search() {
      let time = new Date().getTime()
      let parmas = {
        rid: time,
        data: {
          enterName: this.name,
          category:this.checkedCities,
        }
      }
      this.list = []
      this.$message({
        dangerouslyUseHTMLString: true,
        type: 'warning',
        message: '<i class="el-icon-loading"></i><span style="margin-left:20px">剩余数据正在马不停蹄的飞奔过来</span>',
        duration: 0
      });
      this.disabled = true
      this.$socket.emit('enterDetails', parmas);
    },



    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
    //以下注释内容，this.socket.on方法拿不到返回值，不知道是什么原因。
    // search() {
    //   let time = new Date().getTime()
    //   let parmas = {
    //     rid: time,
    //     data: {
    //       name: '张三',
    //       cide: '123456199001011233',
    //       mobile: '13800138000',
    //       card: '8888777766665555',
    //       address: '东四礼士胡同54号',
    //     }
    //   }
    //   console.log('我要发送请求了')
    //   this.$socket.emit('queryall', 'aaa')
    // },
    // socketOn() {
    //   this.$socket.on('queryall', function (res,val) {
    //     console.log(res,val)
    //   })
    // }
  }
}
</script>
<style scoped>
.shouru,
.zhichu {
  margin-right: 20px;
}
.shouru span,
.zhichu span {
  vertical-align: text-bottom;
  position: relative;
  top: -5px;
  color: #8492a6;
  font-size: 12px;
}
.text {
  font-size: 14px;
  color: #606266;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}
.header {
  ont-size: 16px;
  color: #606266;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}
.itemBox {
  padding-top: 10px;
}
.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-col-8 {
  padding: 10px 10px;
}
.box-card {
  display: inline-block;
  max-width: 480px;
  width: 100%;
  position: relative;
  margin: 10px;
  vertical-align: top;
}
.checkbox-group{
  display: inline-block
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
</style>
