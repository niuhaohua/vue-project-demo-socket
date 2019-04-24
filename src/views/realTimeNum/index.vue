<template>
  <div class="app-container">
    <!-- <button  @click="search">发送</button> -->
    <el-table
      :data="list"
      border
      style="width: 100%;padding-top: 15px;"
      ref="table"
      @row-click="abb"
    >
      <el-table-column label="类别" width="200">
        <template slot-scope="scope">
          <span :class="scope.row.refkey">{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据库" width="250">
        <template slot-scope="scope">
          <span :class="['col2',scope.row.refkey]">
            <span class="zhName2">{{ scope.row.dataBase | getKuNameFilter }}</span>
            <span>{{ scope.row.dataBase | getNameFilter }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="表名" min-width="200">
        <template slot-scope="scope">
          <span :class="['col',scope.row.refkey]">
            <span class="zhName">{{ scope.row.cnName | getCnNameFilter }}</span>
            <span>{{ scope.row.cnName | getNameFilter }}</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column label="数据来源" min-width="200">
        <template slot-scope="scope">
          <span :class="scope.row.refkey">{{ scope.row.dataSource }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新频率" min-width="200">
        <template slot-scope="scope">
          <span :class="scope.row.refkey">{{ scope.row.updateFrequency }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数据条数" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.refkey">
            <span>{{ scope.row.amount | qianzifuFilter }}</span>
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Status" min-width="400" align="center">
      <template slot-scope="scope">-->
      <!-- <line-charts :chart-data="lineChartData"/> -->
      <!-- </template>
      </el-table-column>-->
    </el-table>
    <dialog-com :dialog-data="tableData"/>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import store from './../../store/index'
import LineCharts from './components/lineCharts'
import BarCharts from './components/barCharts'
import dataMock from './dataMock'

import DialogCom from './components/dialog'


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}


export default {
  name: 'RealTimeNum',
  components: {
    // GithubCorner
    LineCharts,
    BarCharts,
    DialogCom
  },
  data() {
    return {
      val: 'val',
      dataBaseObj: dataMock.dataBaseObj,
      classObj: dataMock.classObj,
      list: [],
      tableData: {
        flag: false,
        data: null
      }
    }
  },
  watch: {

  },
  created() {
    this.$store.dispatch('getDicName', '')
  },
  mounted() {
    console.log(this.$refs)
    let parmas = {
      data: {
        flag: 'start'
      }
    }
    this.$socket.emit('enterDbAmount', parmas)
    this.$socket.on('enterDbAmount', data => {
      data = JSON.parse(data)
      console.log(data)
      if (this.list.length === 0) {
        this.list = this.listClassify(data)
      } else {
        for (let i in this.list) {
          for (let j in data) {
            if (data[j].cnName === this.list[i].cnName) {
              if (this.list[i].amount === data[j].amount) {
                continue
              }
              this.list[i].amount = data[j].amount
              let nodes = document.querySelectorAll('.' + this.list[i].refkey)
              for (let y = 0; y < nodes.length; y++) {
                nodes[y].classList.add('el-color')
              }
              let timer = setTimeout(() => {
                for (let y = 0; y < nodes.length; y++) {
                  nodes[y].classList.remove('el-color')
                }
                clearTimeout(timer)
              }, 2500)
            }
          }
        }
      }

    })
  },
  methods: {
    abb(row, column, event) {
      this.tableData.flag = true
      console.log(row)
      this.tableData.data = row.tableInfo
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.lie1) {
          return {
            rowspan: row.lie1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 1) {
        if (row.lie2) {
          return {
            rowspan: row.lie2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    listClassify(data) {
      let list = []
      let obj1 = {}
      let obj2 = {}
      for (let i in data) {
        let key = data[i]
        if (!this.dataBaseObj[key['cnName']]) {
          continue
        }
        let dataBaseName = this.dataBaseObj[key['cnName']]
        key['dataBase'] = this.dataBaseObj[key['cnName']]
        key['refkey'] = 'class' + key.name + '_' + i
        key['key'] = '_' + i
        if (!obj1[dataBaseName]) {
          obj1[dataBaseName] = []
          obj1[dataBaseName].push(key)
          obj1[dataBaseName][0]['lie2'] = 1
        } else {
          obj1[dataBaseName].push(key)
          obj1[dataBaseName][0]['lie2'] = obj1[dataBaseName][0]['lie2'] + 1
        }
      }
      for (let key in obj1) {
        let className = this.classObj[key]
        if (!obj2[className]) {
          obj2[className] = []
        }
        for (let i in obj1[key]) {
          obj1[key][i].className = className
        }
        obj2[className] = obj2[className].concat(obj1[key])
      }

      if (this.list.length === 0) {
        list = [...obj2['工商'], ...obj2['司法']]
        delete obj2['司法']
        delete obj2['工商']
      }

      for (let key in obj2) {
        list = list.concat(obj2[key])
      }
      return list
    },
    listSort(data) {

    },

    search() {
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
  },
  beforeDestroy() {
    let parmas = {
      data: {
        flag: 'end'
      }
    }
    this.$socket.emit('enterDbAmount', parmas)
  }
}
</script>
<style>
.el-table tr.el-table__row {
  cursor: pointer;
}
</style>
<style scoped>
.val {
  background: rgba(125, 0, 0, 0);
  opacity: 1;
  transition: background 1s;
  -moz-transition: background 1s; /* Firefox 4 */
  -webkit-transition: background 1s; /* Safari 和 Chrome */
  -o-transition: background 1s; /* Opera */
}
/* .ins {
  color: #606266 !important;
}

.bar {
  display: inline-block;
   width: 100%;
  height: 100%; 
   color: rgba(255, 0, 0, 1) !important; 
} */

.zhName {
  background-color: rgba(24, 144, 255, 0.1);
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;

  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(24, 144, 255, 0.2);
  white-space: nowrap;
}
.col {
  color: #1890ff;
}

.zhName2 {
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  background-color: rgba(19, 206, 102, 0.1);
  border: 1px solid rgba(19, 206, 102, 0.2);
}
.col2 {
  color: #13ce66;
}

.el-color {
  color: rgba(255, 0, 0, 1);
}
.ins .bar {
  -webkit-animation: fill 2s linear;
  -moz-animation: fill 2s linear;
  /* background: rgba(255, 0, 0, 0) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
}
.ins .barrr {
  -webkit-animation: fill1 0s linear;
  -moz-animation: fill1 0s linear;
  /* background: rgba(255, 0, 0, 0) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
}
@keyframes fill {
  0% {
    color: rgba(255, 0, 0, 1);
    /* background: rgba(255, 0, 0, 0) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
  20% {
    color: rgba(255, 0, 0, 0.5);
    /* background: rgba(255, 0, 0, 0.3) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
  40% {
    color: rgba(255, 0, 0, 1);
    /* background: rgba(255, 0, 0, 0.3) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
  60% {
    color: rgba(255, 0, 0, 0.5);
    /* background: rgba(255, 0, 0, 0.3) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
  80% {
    color: rgba(255, 0, 0, 1);
    /* background: rgba(255, 0, 0, 0.3) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
  100% {
    color: #606266;
    /* background: rgba(255, 0, 0, 0.3) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
}
@keyframes fill1 {
  0% {
    color: rgba(255, 0, 0, 0.5);
  }
  100% {
    color: #606266;
    /* background: rgba(255, 0, 0, 0.3) -webkit-radial-gradient(center, rgba(255, 0, 0, 0.3), rgba(255, 250, 250, 0)); */
  }
}
</style>
