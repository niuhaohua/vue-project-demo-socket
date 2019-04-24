
<template>
  <div>
    <el-dialog title="" :visible.sync="dialogTableVisible" @close="closeDialog">
      <el-table :data="listData">
        <el-table-column property="tb_name" label="数据表名" min-width="250"></el-table-column>
        <el-table-column property="tableSchema" label="库名" min-width="200"></el-table-column>
        <el-table-column property="columnName" label="列名" min-width="150"></el-table-column>
        <el-table-column property="isNullable" label="是否非空" min-width="150"></el-table-column>
        <el-table-column property="dataType" label="字段类型" min-width="100"></el-table-column>
        <el-table-column property="characterLength" label="字段长度" min-width="150"></el-table-column>
        <el-table-column property="columnComment" label="备注" min-width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogData: {
      type: Object,
      default: {},
      required: true
    }
  },
  data() {
    return {
      data: this.dialogData,
      listData: [],
      dialogTableVisible: false
    }
  },
  watch: {
    dialogData: {
      deep: true,
      handler(val) {
          console.log(val)
        if (val) {
          this.dialogTableVisible = val.flag
          this.listData = val.data
        }
      }
    }
  },

  methods: {
    closeDialog() {
    //   console.log(this.data, this.dialogData)
    //   this.data = {}
    this.dialogData.flag = false
    //   this.dialogTableVisible = false
    }
  }
}
</script>
<style>
.el-dialog{
    width: 70%
}
</style>
