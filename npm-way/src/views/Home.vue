<template>
  <div class="home table-wrap">
    <!-- vue基于element table表格拖拽 start -->
    <div class="table-box">
      <h4>element表格：</h4>
      <el-table :data="tableData" border stripe row-key="id" align="left">
        <el-table-column v-for="(item, index) in col" :key="`col_${index}`" :prop="dropCol[index].prop" :label="item.label"></el-table-column>
      </el-table>
    </div>
    <hr>
    <div class="datashow-box">
      <div class="columndata">
        <h4>列拖拽时的数据变化：</h4>
        <pre style="text-align: left">{{dropCol}}</pre>
      </div>
      <div class="rowdata">
        <h4>行拖拽时的数据变化：</h4>
        <pre style="text-align: left">{{tableData}}</pre>
      </div>
    </div>
    <!-- vue基于element table表格拖拽 end -->
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  data () {
    return {
      col: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      dropCol: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      tableData: [
        {
          id: '1',
          date: '2016-05-01',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 101 弄'
        },
        {
          id: '2',
          date: '2016-05-02',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 102 弄'
        },
        {
          id: '3',
          date: '2016-05-03',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 103 弄'
        },
        {
          id: '4',
          date: '2016-05-04',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 104 弄'
        }
      ]
    }
  },
  mounted () {
    this.rowDrop()
    this.columnDrop()
  },
  methods: {
    // 行拖拽
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd ({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 列拖拽
    columnDrop () {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    }
  }
}
</script>
<style scoped>
.table-wrap{width: 900px; margin: 0 auto;}
.table-box{width: 800px; margin: 0 auto;}
.datashow-box{overflow: hidden; zoom: 1;}
.columndata{float: left;}
.rowdata{float: right;}
</style>
