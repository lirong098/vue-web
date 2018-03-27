<template>
  <div class="dw_pagination">
    <el-pagination
            @size-change="perPageChange"
            @current-change="pageChange"
            :current-page.sync="page"
            :page-sizes="[10, 20, 30, 40, 50 , 100]"
            :page-size="perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'dw_pagination',
  components: {},
  props: {
    // 父组件传入总数
    pagingTotal: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      page: 1, // 当前页
      perPage: 20, // 分页条数
      total: this.pagingTotal // 总条数
    }
  },
  computed: {},
  methods: {
    perPageChange (perPage) {
      // 数据变化传给父组件 当前页，分页条数
      this.perPage = perPage
      this.$emit('getPagingData', this.page, perPage)
    },
    pageChange (page) {
      this.page = page
      this.$emit('getPagingData', page, this.perPage)
    }
  },
  watch: {
    pagingTotal: function (val) {
      this.total = val
    }
  }
}
</script>
