<template>
  <div calss="dw_table">
    <el-row type="flex" justify="end" class="dw_table_row">
      <slot name="search"></slot>
      <dw-pagination
        v-if="isPagination"
        :pagingTotal="pagingTotal"
        @getPagingData="pagingData">
      </dw-pagination>
    </el-row>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      border
      v-bind="tableAttrs"
      v-on="tableEvents"
      :row-class-name="tableRowClassName"
      header-cell-class-name="dwTableHeaderCellClass">
      <dw-table-column-plus
        v-for="(item,key) in tableColumns"
        :key="key"
        v-bind="item"
        show-overflow-tooltip>
      </dw-table-column-plus>
    </el-table>
  </div>
</template>
<script>
// getPagingData事件
// return (page, perPage)
import dwTableColumnPlus from './dw-table-column-plus.vue'
import dwPagination from './dw_pagination.vue'
export default {
  name: 'dw_table',
  components: {
    dwTableColumnPlus,
    dwPagination
  },
  props: {
    tableAttrs: {
      type: Object,
      default: () => ({})
    },
    tableEvents: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Array,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true
    },
    pagingTotal: {
      type: Number,
      default: 100
    },
    isPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.op_action === 'delete') {
        return 'waring-row'
      }
      return ''
    },
    test (row) {
      console.log('ds', row)
      this.$refs.prMTable.toggleRowSelection(row, true)
    },
    pagingData (page, perPage) {
      this.$emit('getPagingData', page, perPage)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .dw_table_row{
    align-items: center;
    margin-bottom: 10px;
  }
  .el-table{
    .waring-row {
        background: oldlace;
      }
      .dwTableHeaderCellClass {
        text-align: center;
      }
  }
</style>
