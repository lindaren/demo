import { mapState } from "vuex";
import { SUM_ORDER, ORDER_LIST, Search_PLACE } from "@/utils/Interface";
import { Loadmore, InfiniteScroll, Search } from 'mint-ui';
import utils from '@/utils/utils'
import "../../laydate/laydate";
import '../../laydate/theme/default/laydate.css'
export default {
    name: "order",
    components: {
        'mt-loadmore': Loadmore,
    },
    data() {
        return {
            place: "经营场所",
            params: {
                pageNo: 1,
                pageSize: 10
            },
            selectList: [{ id: '0', name: '场所名称' }, { id: '1', name: '终端编号' }],
            dataList: [],
            searchList: [],
            URL: ORDER_LIST,
            loading: false,
            allLoaded: false,
            value: '',
            okText: "搜索",
            isListShow: false,
            isMore: true,
            name: [{ id: 0, name: "场所名称", select: "ye" }, { id: 1, name: "终端编号", select: "no" }],
            imgUrl: require("../../../static/imgs_new/down.png"),
            showSe: false,
            typeId: 0,
            placeholder: "请输入场所名称",
            imgRefund: require('../../../static/imgs/refund.png'),
            imgReVip:require('../../../static/imgs_new/img.png'),
            clearIsShow: false,
            isFirst: true,
            showError: true
        };
    },
    methods: {
        // 搜索
        async loadData(type, id, name) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                this.$nextTick(() => {
                    $('#beginDate').text(this.getDay(-6))
                    $('#endDate').text(this.getDay(0))
                })
                // 建议列表点击的场所id
                if (type == 0) {
                    this.dataList = []
                    this.isListShow = false;
                    this.params.placeId = id;
                    this.$refs.input.value = name;
                    $('.maskBox').slideUp()
                    $('.mask').slideUp()
                    if (this.$refs.input.value) {
                        this.clearIsShow = true
                    }
                } else {
                    // 弹出框的点击确定时的正常搜索
                    // 场所搜索
                    if (this.typeId == 0) {
                        this.params.placeName = this.$refs.input.value
                        this.params.termNo = ''
                    } else {
                        this.dataList = []
                        // 终端编号搜索
                        this.params.pageNo = 1
                        this.params.pageSize = 10
                        this.params.placeName = ""
                        this.params.placeId = ""
                        this.params.termNo = this.$refs.input.value
                    }

                }

                // 第一次加载默认本日的订单
                if (this.isFirst) {
                    // this.params.beginDate = this.getDay(0).replace(/-/g, '/')
                    // this.params.endDate = this.getDay(1).replace(/-/g, '/')
                    this.params.beginDate = this.getDay(-6).replace(/-/g, '/')
                    this.params.endDate = this.getDay(0).replace(/-/g, '/')
                } else {
                    // 如果没有选择日期则默认本周
                    if (!this.$refs.startTime.value || !this.$refs.endTime.value) {
                        this.params.beginDate = this.getDay(-6).replace(/-/g, '/');
                        this.params.endDate = this.getDay(0).replace(/-/g, '/');
                    } else {
                        this.params.beginDate = this.$refs.startTime.value.replace(/-/g, '/');
                        this.params.endDate = this.$refs.endTime.value.replace(/-/g, '/');
                    }
                }
               
                let { data } = await this.$http({
                    url: this.URL,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }

                });
                if (data.data.list == 0) {
                    this.isMore = false;
                    if (this.params.pageNo == 1) {
                        this.showError = true;
                        this.dataList = data.data.list
                    } else {
                        this.$Toast("没有更多数据了！")
                    }

                } else {
                    this.showError = false
                    if (this.params.pageNo > 1) {
                        this.dataList = this.dataList.concat(data.data.list)
                    } else {
                        this.dataList = data.data.list
                    }
                }

            } catch (e) {
            } finally {
                this.$Indicator.close();
                this.isListShow = false;
            }
        },
        // 建议搜索
        async suggest_search() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                if (this.typeId == 0) {
                    this.params.placeName = this.$refs.input.value
                    this.params.placeId = ''
                } else {
                    this.params.placeName = ''
                    this.params.placeId = this.$refs.input.value
                }
                this.params.pageNo = 1;
                this.params.pageSize = 10;

               
                let { data } = await this.$http({
                    url: ORDER_LIST,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }
                });
                if (data.data.list.length == 0) {
                    this.showError = true;
                    this.$Toast("查不到此数据！")
                }else{
                    this.showError = false
                }
                
                this.dataList = data.data.list;
                

            } catch (e) {

            } finally {
                this.$Indicator.close();
            }
            // }

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
                for (let i = 0; i < $('.mask_header div').length; i++) {
                    $('.mask_header div').eq(i).removeClass('active')
                }
                $('.mask_header div').eq(0).addClass('active')
                this.$refs.startTime.value = this.getDay(-6)
                this.$refs.endTime.value = this.getDay(0)
            }
            $('.maskBox').toggle()
            $('.mask').slideToggle()
        },
        reset() {
            this.$refs.startTime.value = this.getDay(-6)
            this.$refs.endTime.value = this.getDay(0)
            for (let i = 0; i < $('.mask_header div').length; i++) {
                $('.mask_header div').eq(i).removeClass('active')
            }
            $('.mask_header div').eq(0).addClass('active')
            this.$refs.input.value = ""
        },
        checkTime(type) {
            this.params.pageNo = 1;
            this.isMore = true;
            // 选择日期后判定为不是初次加载
            this.isFirst = false;
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
            // console.log(type)
            if (type == 0) {
                if (this.typeId == 0) {
                    this.suggest_search()
                    $('.searchList').show()
                    // return;
                    // 当我点击确认的时候
                } else {
                    $('.maskBox').slideUp()
                    $('.mask').slideUp()
                    this.loadData()
                }
            } else {
                this.toggle();
                // this.suggest_search()
                this.loadData()
            }
            this.isListShow = false;
        //    this.params.placeId? this.loadData():null;
            return true;
        },
        // 加载组件
        more() {
            if (this.isMore) {
                this.params.pageNo += 1;
            }
            this.loadData();
        },
        loadPageList() {
            this.params.pageNo = 1;
            this.loadData();
        },
        loadTop: function () { //组件提供的下拉触发方法  
            //下拉加载  
            this.loadPageList();
            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
        loadBottom: function () {
            // 上拉加载  
            this.more();// 上拉触发的分页查询  
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
        // 下拉框
        showSelect() {
            if (!this.showSe) {
                this.showSe = true;
                this.imgUrl = require("../../../static/imgs_new/up.png");
            } else {
                this.showSe = false;
                this.imgUrl = require("../../../static/imgs_new/down.png");
            }
        },
        getSelect(item, index) {
            this.$refs.input.value = ""
            if (item.id == 0) {
                // 场所名称
                this.typeId = 0;
                this.placeholder = "请输入场所名称"
            } else if (item.id == 1) {
                // 终端编号
                this.typeId = 1;
                this.placeholder = "请输入终端编号"
            }
            this.name.splice(index, 1);
            this.name.unshift(item)
            this.name[0].select = "ye"
            this.name[1].select = "no"
            this.showSe = false;
            this.imgUrl = require("../../../static/imgs_new/down.png");
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
        this.loadData()

    }
};