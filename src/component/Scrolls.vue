<template>
    <div ref="scroll" class="fy-scroll-wrap" id="fy-scroll-wrap">
        <div v-infinite-scroll="loadPageData" :infinite-scroll-distance="20">
            <slot :data="dataList"></slot>
            <!-- 加载更多loading -->
            <mt-spinner v-show="loading" class="page-infinite-loading" :type="3">
            </mt-spinner>
            <!-- 没有更多数据了 -->
            <p class="scroll-max-page" v-show="isMaxPage">没有更多数据了</p>
            <!-- not -->
            <NotDataTip :msg="notError" v-show="!isMaxPage&&isNotDataTip" />
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Spinner, InfiniteScroll } from "mint-ui";
import utils from '@/utils/utils';
Vue.use(InfiniteScroll);
export default {
  name: "Scrolls",
  components: {
    [Spinner.name]: Spinner
  },
  props: {
    page: {
      type: Boolean,
      default: true
    },
    param: Object,
    URL: String,
    prop: {
      type: Object,
      default() {
        return {
          list: "list",
          total: "totalCount"
        };
      }
    }
  },
  data() {
    return {
      dataList: [],
      loading: false,
      notError: "暂无数据",
      params: {
        page: 0,
        totalCount: "...",
        rows: 20,
        pageNo: 0,
        pageSize: 20
      }
    };
  },
  computed: {
    //最大页数
    isMaxPage() {
      return (
        this.dataList.length >= this.params.totalCount &&
        this.dataList.length !== 0
      );
    },
    //没有数据
    isNotDataTip() {
      return this.dataList.length == 0 && this.loading === false;
    }
  },
  watch: {
    param: {
      handler: function(val, oldVal) {
        this.params = { ...this.params, ...val };
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    //分页加载
    loadPageData() {
      //加载中不触发
      if (this.loading) {
        return;
      }
      if (this.isMaxPage) {
        return this.hide();
      }
      if (this.page) {
        this.params.page++;
        this.params.pageNo = this.params.page;
        this.loadData();
      } else if (this.dataList.length == 0) {
        this.params.page = 1;
        this.params.pageNo = 1;
        this.loadData("search");
      }
    },
    async loadData(result) {
      this.loading = true;
      try {
        let { data } = await this.$http({
          url: this.URL,
          params: this.params,
          headers: {
            authorization: utils.storage.getLocal("authorization")
          }
        });
        this.hide();
        let { data: $data = {} } = data;
        let list = $data[this.prop.list] || [];
        let totalCount = $data[this.prop.total];
        this.params.totalCount = totalCount;
        if (result === "search") {
          this.dataList = list;
          this.backTop();
        } else {
          this.dataList = this.dataList.concat(list);
        }
        //返回数据 以及查询参数
        this.$emit("change", {
          data: this.parse(data),
          params: this.parse(this.params)
        });
        this.notError = "暂无数据";
      } catch (e) {
        this.notError = `服务器错误，请刷新重试`;
        this.hide();
      }
    },
    //外部调用加载方法
    reload(...args) {
      this.$nextTick(() => {
        this.$Indicator.open({ spinnerType: "fading-circle" });
        this.params.page = 1;
        this.params.pageNo = 1;
        this.dataList = [];
        this.loadData(...args);
      });
    },
    //隐藏loading
    hide() {
      this.loading = false;
      this.$nextTick(() => {
        this.$Indicator.close();
      });
    },
    //json拷贝
    parse(data) {
      return JSON.parse(JSON.stringify(data));
    },
    //回到顶部
    backTop() {
      this.$nextTick(() => {
        this.$refs.scroll ? (this.$refs.scroll.scrollTop = 0) : null;
      });
    }
  }
};
</script>

<style lang="less">
#fy-scroll-wrap {
  padding-top: 0;
}
.fy-scroll-wrap {
  padding-bottom: 0;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .scroll-max-page {
    text-align: center;
    font-size: 0.28rem;
    padding: 0.2rem;
    color: #555;
  }
}
</style>
