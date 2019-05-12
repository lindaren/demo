import { mapState } from "vuex";
import { INCOME_LIST, INCOME_PLACE, Search_PLACE } from "@/utils/Interface";
import { Loadmore, InfiniteScroll, Search } from 'mint-ui';
import utils from '@/utils/utils'
import "../../laydate/laydate";
import '../../laydate/theme/default/laydate.css'
import { setTimeout } from "timers";
import { isArray } from "util";
export default {
    name: "inCome",
    components: {
        'mt-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
    },
    data() {
        return {
            place: "经营场所",
            totalFee: "",
            myChart: '',
            params: {
                // beginDate:'2018/05/01',
                // endDate:'2018/05/31',
                // placeName:'宝龙城市广场3楼',
                // placeId:'350103000054'
                pageNo: 1,
                pageSize: 10
            },
            URL: INCOME_LIST,
            loading: false,
            allLoaded: false,
            value: '',
            okText: "搜索",
            data: [],
            detailList: [],
            dataList: [],
            searchList: [],
            isShow: false,
            // isShow: true,
            name: [{ id: 0, name: "场所名称", select: "ye" }, { id: 1, name: "终端编号", select: "no" }],
            imgUrl: require("../../../static/imgs_new/down.png"),
            showSe: false,
            // 0为场所名称 1为终端编号
            typeId: 0,
            placeholder: "请输入场所名称",
            option: {},
            count: true,
            clearIsShow: false,
            isNavShow: false,
        };
    },
    created() {

    },
    methods: {
        // 搜索
        async loadData(type, id, name) {
            // this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                if (!this.$refs.input.value) {
                    this.params.placeId = ""
                }
                // 用场所名称搜索  建议列表点击的场所id
                if (type == 0) {
                    this.params.placeId = id;
                    this.$refs.input.value = name;
                    $('.maskBox').slideUp()
                    $('.mask').slideUp()
                    if (this.$refs.input.value) {
                        this.clearIsShow = true
                    }
                } else {
                    // 弹出框的点击确定时的正常搜索
                    if (this.typeId == 0) {
                        this.params.placeName = this.$refs.input.value
                        this.params.termNo = ''
                    } else {
                        this.params.placeName = ''
                        this.params.termNo = this.$refs.input.value;
                    }
                }

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

                if (data.code != 0) {
                    return this.$Toast(data.msg)
                }
                this.dataList = data.data
                this.data = []
                let obj = this.dataList.list
                let profit = Object.values(obj)


                let beginDate = this.params.beginDate,
                    endDate = this.params.endDate,
                    startTime = Date.parse((beginDate)),
                    endTime = Date.parse((endDate)),
                    dateNum = (endTime - startTime) / 1000 / 3600 / 24,
                    dateAry = [],
                    dateAry1 = [],
                    profileArr = [],
                    date = new Date(beginDate);

                dateAry.push(date.Format("MM-dd"))
                for (let i = 0; i < dateNum; i++) {
                    date.setDate(date.getDate() + 1)
                    dateAry.push(date.Format("MM-dd"))
                    // console.log(dateAry[i].replace(/-/g, "月") + '日')
                    // dateAry1.push(dateAry[i].replace(/-/g, "月") + '日')
                }
                // console.log(dateAry1)
                // dateAry = dateAry1
                // dateAry=["05-01", "05-02", "05-03", "05-04", "05-05", "05-06", "05-07", "05-08", "05-09", "05-10", "05-11", "05-12", "05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19", "","","","","","","","","","","",""]
                // date = dateAry
                for (let i in dateAry) {
                    if (profit[i] == undefined) {
                        profit[i] = 0;
                    }
                    profileArr.push(Number(profit[i]))
                }
                // console.log(dateAry)
                // console.log(profileArr)
                this.$nextTick(() => {
                    this.myChart = echarts.init(document.getElementById('chartmain'));
                    this.option = {
                        // backgroundColor:'red',
                        tooltip: {
                            trigger: "axis",
                            formatter: '日期 :' + '{b}' + '<br/>' + '{a0}:{c0}' + '元'
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: dateAry, //{b}
                            axisLine: {
                                lineStyle: {
                                    // color: "#6C9FF8",
                                    width: 1
                                }
                            },
                            // axisLabel: { interval: 0 } //显示x轴全部内容
                        },
                        // dataZoom: [{ type: 'slider', show: true, xAxisIndex: [0], left: '9%', bottom: -5, start: 10, end: 390 }], // 滚动条

                        yAxis: {
                            type: "value",
                            splitLine: {
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: ["#E7F5FF"]
                                }
                            },
                            nameTextStyle: {
                                color: ["#0087ED"]
                            },
                            // axisLabel: {
                            //     formatter: '{value}元'
                            // },
                        },
                        series: [
                            {
                                name: "收入 ", // {a0}
                                type: "line",
                                // areaStyle:{

                                // },
                                areaStyle: { normal: {} },
                                // stack: '销量',
                                itemStyle: {
                                    normal: {
                                        color: "#6C9FF8", // 坐标点的颜色
                                        lineStyle: {
                                            color: "#E7F5FF" //线条的颜色
                                        }
                                    }
                                },
                                data:
                                    profileArr,// {c0}
                                // [200, 360, 160,200, 360, 160]

                            }
                        ]
                    };

                    this.myChart.setOption(this.option);
                    $('#chartmain div').eq(1).addClass('zIndex')
                    // $('#chartmain').css({'margin-left':'10px','margin-right':'-10px'})
                })



                // for (let i in date) {
                //     let arr = {}
                //     arr.time = date[i]
                //     if (profit[i] == undefined) {
                //         profit[i] = 0;
                //     }
                //     arr.tem = Number(profit[i])
                //     this.data.push(arr)
                // }
                // console.log(this.data)
                this.isShow = true
                this.$nextTick(() => {
                    if (!this.$refs.startTime.value || !this.$refs.endTime.value) {
                        $('#beginDate').text(this.getDay(-6))
                        $('#endDate').text(this.getDay(0))
                    } else {
                        $('#beginDate').text(this.$refs.startTime.value)
                        $('#endDate').text(this.$refs.endTime.value)
                    }
                    if (data.data.placeName) {
                        this.$refs.title.innerHTML = data.data.placeName
                    } else {
                        this.$refs.title.innerHTML = ''
                    }
                    // console.log("拿过来的值：" + name)
                    // console.log("参数： " + this.params.placeName)
                    // console.log("返回的数据： " + data.data.placeName)

                })
                $('.searchList').hide()
            } catch (e) {
                // console.log(e)
                this.isShow = false
            } finally {
                // this.$Indicator.close();
            }
        },
        // 明细
        async loadDetailData(isLoad) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                this.params.placeId = ""
                this.params.placeName = this.$refs.input.value
                // this.params.beginDate = this.$refs.startTime.value.replace(/-/g, '/')
                // this.params.endDate = this.$refs.endTime.value.replace(/-/g, '/')
                // this.params.pageNo = 1
                // this.params.pageSize = 2

                let { data } = await this.$http({
                    url: INCOME_PLACE,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }
                });
                if (data.code == 0) {
                    if (!isLoad) {
                        if ($('.arrowhead1').hasClass("showDetail")) {
                            $('.arrowhead1').addClass('hideDetail').removeClass('showDetail')
                        } else {
                            $('.arrowhead1').addClass('showDetail').removeClass('hideDetail')
                        }
                        // !isLoad ? $('.dataList').slideToggle() : null
                        $('.dataList').slideToggle()
                    } else {

                    }

                }

                if (data.data.list == 0) {
                    this.$Toast("没有更多数据了！")
                } else {
                    if (this.params.pageNo > 1) {
                        this.detailList = this.detailList.concat(data.data.list)
                    } else {
                        this.detailList = data.data.list
                    }
                }

            } catch (e) {

            } finally {
                this.$Indicator.close();
            }
        },
        // 建议搜索
        async suggest_search() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                if (this.typeId == 0) {
                    this.params.placeName = this.$refs.input.value
                    this.params.placeId = ''
                    this.params.termNo = ''
                } else {
                    this.params.placeName = ''
                    this.params.placeId = this.$refs.input.value
                }
                this.params.pageNo = 1;
                this.params.pageSize = 5;

                let { data } = await this.$http({
                    url: Search_PLACE,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }
                });
                this.searchList = data.data.list


            } catch (e) {
                this.$Toast('查询不到数据！')
            } finally {
                this.$Indicator.close();
            }
        },
        slide() {

            if (this.typeId == 0) {
                if (!$('.arrowhead1').hasClass("showDetail")) {
                    this.loadDetailData()
                } else {
                    if ($('.arrowhead1').hasClass("showDetail")) {
                        $('.arrowhead1').addClass('hideDetail').removeClass('showDetail')
                    } else {
                        $('.arrowhead1').addClass('showDetail').removeClass('hideDetail')
                    }
                    $('.dataList').slideToggle()
                }
            } else {
                this.$router.push({ name: 'InComeDetail', query: { termNo: this.$refs.input.value, beginDate: this.params.beginDate, endDate: this.params.endDate } })
            }

        },
        toggle() {
            this.isNavShow = !this.isNavShow
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
            $('.title').html('')
        },
        checkTime(type) {

            $('.dataList').hide()
            $('.arrowhead1').addClass('hideDetail').removeClass('showDetail')
            for (let i = 0; i < $('.mask_nav div').length; i++) {
                $('.mask_nav div').eq(i).removeClass('active')
            }
            var begintime = this.$refs.startTime.value;
            var endtime = this.$refs.endTime.value;
            // 当我点击搜索的时候
            if (type == 0) {
                if (!this.$refs.input.value) {
                    this.loadData()
                    return
                }
                if (this.typeId == 0) {

                    this.suggest_search()
                    if (!this.$refs.input.value) {
                        // this.params.placeId=""
                        $('.searchList').hide()
                    } else {
                        this.count = !this.count

                        $('.searchList').show()
                        // console.log(this.count)
                        if (this.count == true) {
                            $('.searchList').hide()
                            this.loadData()
                            $('.maskBox').slideUp()
                            $('.mask').slideUp()
                        }
                    }
                    return;
                }
            } else {
                this.toggle();
            }


            var time1 = new Date(begintime).getTime();
            var time2 = new Date(endtime).getTime();

            // if (begintime == '' || endtime == '') {
            //     this.$Toast("请选择日期范围！");
            //     return false;
            // }
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
                if (arr2[1] - arr1[1] > 1) { //月间隔超过1个月
                    flag = false;
                } else if (arr2[1] - arr1[1] == 1) { //月相隔1个月，比较日
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
                    } else if (arr1[1] + 1 - arr2[1] < 12) { //月相隔大于1个月
                        flag = false;
                    } else if (arr1[1] + 1 - arr2[1] == 12) { //月相隔1个月，比较日
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
            this.loadData();

            return true;
        },
        pickDate(type, out) {
            let date_ = new Date();
            let year = date_.getFullYear();
            let month = date_.getMonth() + 1;
            let lastMonth = date_.getMonth() < 10 ? "0" + date_.getMonth() : date_.getMonth()
            let thisMonth_day = new Date(year, month, 0);//当月
            let lastMonth_day = new Date(year, date_.getMonth(), 0);//上月
            let thisMonth_firstdate = year + '-' + month + '-01';//当月第一天
            let thisMonth_lastdate = year + '-' + month + '-' + thisMonth_day.getDate();//当月最后一天
            let lastMonth_firstdate = year + '-' + lastMonth + '-01';//上个月第一天
            let lastMonth_lastdate = year + '-' + lastMonth + '-' + lastMonth_day.getDate();//上个月最后一天
            if (type == 0) {
                this.$refs.startTime.value = thisMonth_firstdate
                this.$refs.endTime.value = thisMonth_lastdate
            } else if (type == 1) {
                if (month == 1) {
                    this.$refs.startTime.value = year - 1 + '-12-01'
                    this.$refs.endTime.value = year - 1 + '-12-31'
                } else {
                    this.$refs.startTime.value = lastMonth_firstdate
                    this.$refs.endTime.value = lastMonth_lastdate
                }
            } else {
                this.$refs.startTime.value = this.getDay(-6)
                this.$refs.endTime.value = this.getDay(0)
            }
            // console.log(lastMonth_firstdate)
            // console.log(lastMonth_lastdate)
            if (out) {
                this.loadData()
            }
            // console.log(`本月第一天${thisMonth_firstdate} ,本月最后一天 ${thisMonth_lastdate}`)
            // console.log(`本月第一天${lastMonth_firstdate} ,本月最后一天 ${lastMonth_lastdate}`)
        },
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
        search() {
            this.params.placeName = this.$refs.input.value
            this.loadData()
        },
        more() {
            this.params.pageNo += 1;
            console.log(this.params.pageNo)
            this.loadDetailData(true);

        },
        loadPageList() {
            this.params.pageNo = 1;
            this.loadDetailData(true);
        },
        loadTop: function () { //组件提供的下拉触发方法  
            //下拉刷新
            this.loadPageList();
            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
        loadBottom: function () {
            // 上拉加载  
            this.more();// 上拉触发的分页查询  
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
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
            this.isShow = false;
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
        }
    },
    mounted() {
        this.loadData()
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
            // console.log(this.$refs.input.value)
            if (this.$refs.input.value) {
                this.clearIsShow = true
            } else {
                this.clearIsShow = false
            }
        })

        $('.mask_nav>div').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
        })

        // console.log(this.getDay(-6))
        // console.log(this.getDay(0))

    },

};