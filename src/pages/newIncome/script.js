import { TODAY } from "@/utils/Interface";
import { Loadmore, InfiniteScroll, Search } from 'mint-ui';
import utils from '@/utils/utils'
import "../../laydate/laydate";
import '../../laydate/theme/default/laydate.css'
export default {
    name: "newIncome",
    components: {
        'mt-loadmore': Loadmore,
    },
    data() {
        return {
            place: "经营场所",
            params: {
                pageNo: 0,
                pageSize: 8
            },
            dataList: [],
            totalIncome: '',
            URL: TODAY,
            // 允许下拉
            loading: false,
            allLoaded: false,
            showError: false,
            okText: "搜索",
            name: [{ id: 0, name: "场所名称", select: "ye" }, { id: 1, name: "设备编号", select: "no" }],
            placeholder: "请输入场所名称",
        };
    },
    methods: {
        // 搜索
        async loadData(isLoad) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                this.$nextTick(() => {
                    $('#beginDate').text(this.getDay(-6))
                    $('#endDate').text(this.getDay(0))
                })
                // 如果调用不是加载更多，则清空数据
                !isLoad ? this.dataList = [] : null
                this.params.placeName = this.$refs.input.value
                // 如果没有选择日期则默认本周
                if (!this.$refs.startTime.value || !this.$refs.endTime.value) {
                    this.params.beginDate = this.getDay(-6).replace(/-/g, '/');
                    this.params.endDate = this.getDay(0).replace(/-/g, '/');
                } else {
                    this.params.beginDate = this.$refs.startTime.value.replace(/-/g, '/');
                    this.params.endDate = this.$refs.endTime.value.replace(/-/g, '/');
                }

                let { data } = await this.$http({
                    url: this.URL,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }

                });
                this.totalIncome = data.data.totalIncome
                // data.data.list=[]
                // 数据为空
                if (data.data.list.length == 0) {
                    // 初次加载就无数据则显示暂无数据
                    if (this.params.pageNo == 1) {
                        this.dataList = data.data.list
                        this.allLoaded = false;
                        this.showError = true;
                        return;
                    } else {
                        // 数据已经全部加载完成
                        this.loading = true;
                        this.allLoaded = true;
                        return;
                    }
                }
                this.allLoaded = false;
                // 拼接数据
                if (this.params.pageNo > 1) {
                    this.dataList = this.dataList.concat(data.data.list);
                } else {
                    // 首次加载的数据
                    this.dataList = data.data.list;
                    if (data.data.list.length < this.params.pageSize) {
                        // this.loading = true;
                        this.allLoaded = true;
                    }
                }
                // if (data.data.list.length <= this.params.pageSize) {
                //     this.loading = true;
                //     this.allLoaded = true;
                // } 
                // if (data.data.list.length==0) {
                //     if (this.params.pageNo == 1) {
                //         this.showError = true;
                //         this.dataList = data.data.list
                //     } else {
                //         this.$Toast("没有更多数据了！")
                //     }

                // } else {
                //     this.showError = false
                //     if (this.params.pageNo > 1) {
                //         this.dataList = this.dataList.concat(data.data.list)
                //     } else {
                //         this.dataList = data.data.list
                //         this.totalIncome = data.data.totalIncome
                //     }
                // }
                // console.log(this.dataList)
            } catch (e) {
            } finally {
                this.$Indicator.close();
            }
        },
        pickDate(type) {
            let date_ = new Date();
            let year = date_.getFullYear();
            let month = date_.getMonth() + 1;
            let thisMonth_day = new Date(year, month, 0);//当月
            let lastMonth_day = new Date(year, date_.getMonth(), 0);//上月
            let thisMonth_firstdate = year + '-' + month + '-01';//当月第一天
            let thisMonth_lastdate = year + '-' + month + '-' + thisMonth_day.getDate();//当月最后一天
            let lastMonth_firstdate = year + '-' + date_.getMonth() + '-01';//上个月第一天
            let lastMonth_lastdate = year + '-' + date_.getMonth() + '-' + lastMonth_day.getDate();//上个月最后一天
            if (type == 0) {
                this.$refs.startTime.value = thisMonth_firstdate
                this.$refs.endTime.value = thisMonth_lastdate
            } else if (type == 1) {
                if(month==1){
                    this.$refs.startTime.value=year-1+'-12-01'
                    this.$refs.endTime.value =year-1+'-12-31'
                }else{
                    this.$refs.startTime.value = lastMonth_firstdate
                    this.$refs.endTime.value = lastMonth_lastdate
                }

            } else {
                this.$refs.startTime.value = this.getDay(-6)
                this.$refs.endTime.value = this.getDay(0)
            }
            // 重置
            this.params.pageNo = 1
            this.loading=false
            this.allLoaded=false
            // this.params.pageSize = 10
            this.loadData()
            $('.maskBox').slideUp();
            $('.mask').slideUp();
        },
        // week
        getTime(n) {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var day = now.getDay();
            //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
            if (day !== 0) {
                n = n + (day - 1);
            }
            else {
                n = n + day;
            }
            if (day) {
                //这个判断是为了解决跨年的问题
                if (month > 1) {
                    month = month;
                }
                //这个判断是为了解决跨年的问题,月份是从0开始的
                else {
                    year = year - 1;
                    month = 12;
                }
            }
            now.setDate(now.getDate() - n);
            year = now.getFullYear();
            month = now.getMonth() + 1;
            date = now.getDate();
            let s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
            return s;
        },
        toggle() {
            if (!this.$refs.startTime.value || !this.$refs.endTime.value) {
                this.$refs.startTime.value = this.getDay(-6)
                this.$refs.endTime.value = this.getDay(0)
            }
            $('.maskBox').toggle()
            $('.mask').slideToggle()
        },
        reset() {
            this.$refs.startTime.value = this.getDay(-6)
            this.$refs.endTime.value = this.getDay(0)
            this.$refs.input.value = ""
        },
        checkTime() {
            this.params.pageNo = 1;
            var begintime = this.$refs.startTime.value;
            var endtime = this.$refs.endTime.value;
            var time1 = new Date(begintime).getTime();
            var time2 = new Date(endtime).getTime();
            if (time1 > time2) {
                this.$Toast("开始时间不能大于结束时间");
                return false;
            }
            //判断时间跨度是否大于2个月
            var arr1 = begintime.split('-');
            var arr2 = endtime.split('-');
            arr1[1] = parseInt(arr1[1]);
            arr1[2] = parseInt(arr1[2]);
            arr2[1] = parseInt(arr2[1]);
            arr2[2] = parseInt(arr2[2]);
            var flag = true;
            if (arr1[0] == arr2[0]) {//同年
                if (arr2[1] - arr1[1] > 1) { //月间隔超过3个月
                    flag = false;
                } else if (arr2[1] - arr1[1] == 1) { //月相隔3个月，比较日
                    if (arr2[2] > arr1[2]) { //结束日期的日大于开始日期的日
                        flag = false;
                    }
                }
            } else { //不同年
                if (arr2[0] - arr1[0] > 1) {
                    flag = false;
                } else if (arr2[0] - arr1[0] == 1) {
                    if (arr1[1] < 10) { //开始年的月份小于10时，不需要跨年
                        flag = false;
                    } else if (arr1[1] + 1 - arr2[1] < 12) { //月相隔大于3个月
                        flag = false;
                    } else if (arr1[1] + 1 - arr2[1] == 12) { //月相隔3个月，比较日
                        if (arr2[2] > arr1[2]) { //结束日期的日大于开始日期的日
                            flag = false;
                        }
                    }
                }
            }
            if (!flag) {
                this.$Toast("时间跨度不得超过1个月！");
                return false;
            }
            $('.maskBox').slideUp()
            $('.mask').slideUp()
            this.loadData()
            return true;
        },
        // 加载组件
        more() {
            this.params.pageNo++;
            this.loadData(true);
        },
        // loadPageList() {
        //     this.params.pageNo = 1;
        //     this.loadData();
        //     this.loading = false;
        // },
        // loadTop() { //组件提供的下拉触发方法  
        //     //下拉加载  
        //     this.loadPageList();
        //     this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        // },
        loadBottom() {
            // 上拉加载  
            this.more();// 上拉触发的分页查询  
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
        clear() {
            this.$refs.input.value = ""
            this.clearIsShow = false
        },
        getDay(day) {
            var today = new Date();
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            tMonth = this.doHandleMonth(tMonth + 1);
            tDate = this.doHandleMonth(tDate);
            return tYear + "-" + tMonth + "-" + tDate;
        },
        doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = "0" + month;
            }
            return m;
        },
    },
    mounted() {
        lay("#version").html("-v" + laydate.v);
        //执行一个laydate实例
        //常规用法
        laydate.render({
            elem: "#test1" //指定元素
        });
        laydate.render({
            elem: "#test2" //指定元素
        });
        // 禁止手机键盘弹出
        $("#test1").focus(function () {
            document.activeElement.blur();
        });
        $("#test2").focus(function () {
            document.activeElement.blur();
        });
        $('.mask_header>div').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
        $('#_input').bind("input propertychange", () => {
            if (this.$refs.input.value) {
                this.clearIsShow = true
            } else {
                this.clearIsShow = false
            }
        })
        // this.loadData()

        $('.mask_nav>div').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
        })


    }
};