import Vue from 'vue'
import { INCOME_DETAIL, Search_ALL } from "@/utils/Interface";
import filter from "@/utils/filter"
import { isArray } from 'util';
import utils from '@/utils/utils'
import { setTimeout } from 'timers';
export default {
    name: "InComeDetail",
    data() {
        return {
            place: "设备明细",
            params: {
            },
            URL: INCOME_DETAIL,
            searchList: [],
            list: [],
            key: [],
            value: [],
            isShow: this.$route.query.termNo ? false : true,
            // name: [{ id: 0, name: "场所名称", select: "ye" }, { id: 1, name: "设备编号", select: "no" }],
            name: [],
            imgUrl: require("../../../static/imgs_new/down.png"),
            showSe: false,
            typeId: 0,
            total: ""
        };
    },
    created() {
        this.$route.query.placeId ? this.params.placeId = this.$route.query.placeId : this.params.placeId = ''
        this.params.beginDate = this.$route.query.beginDate
        this.params.endDate = this.$route.query.endDate
        this.params.termNo = this.$route.query.termNo
    },
    methods: {
        async loadData() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                let { data } = await this.$http({
                    url: this.URL,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }
                });
                filter.DateDifference(this.params.beginDate, this.params.endDate) + 1 >= 5 ? $('.text1').show() : $('.text1').hide()
                // console.log(this.DateDifference(this.params.beginDate,  this.params.endDate) +1)

                this.list = data.data;

                let beginDate = this.$route.query.beginDate,
                    endDate = this.$route.query.endDate,
                    startTime = Date.parse((beginDate)),
                    endTime = Date.parse((endDate)),
                    dateNum = (endTime - startTime) / 1000 / 3600 / 24,
                    dateAry = ['设备编号', '合计'],
                    date = new Date(beginDate);
                var endDates = endDate.replace(/\//g, '-');
                var timeLimit = 3000;
                for (var i = 0; i < this.list.list.length; i++) {
                    var dateFlag = new Date(beginDate.replace(/\//g, '-'));
                    for (var j = 0; j < timeLimit; j++) {
                        var d = this.dateFtt("yyyy-MM-dd", dateFlag);
                        if (this.list.list[i][d] == undefined)
                            this.list.list[i][d] = "0"; 
                        else  this.list.list[i][d] = this.list.list[i][d]; 
                        if (d == endDates) break;
                        dateFlag.setDate(dateFlag.getDate() + 1);
                    }
                }

                dateAry.push(date.Format("MM-dd"))
                for (let i = 0; i < dateNum; i++) {
                    date.setDate(date.getDate() + 1)
                    dateAry.push(date.Format("MM-dd"))
                }
                let key1 = [];
                dateAry.map((item, index) => {
                    if (index > 1) {
                        item = item.slice(3)
                        item = Number(item) + "日"
                    }
                    key1.push(item)
                })
                // key1.splice(0,2)
                // console.log(key1)

                this.key = key1

                this.list.list.forEach((e, i) => {
                    let obj = {}
                    var arrObject = [];
                    for(let i in e){
                        if(i.indexOf('-') != -1){
                            arrObject.push({day:i,data:e[i]})
                        }
                    }
                    arrObject.sort(function(a,b){
                        return Date.parse(a.day.replace(/'-'/g, '/')) - Date.parse(b.day.replace(/'-'/g, '/'))
                    })
                    for(let i in e){
                        if(i.indexOf('-') == -1){
                            arrObject.unshift({day:i,data:e[i]})
                        }
                    }
                    let termNo =arrObject[1];
                    let total=arrObject[0];
                    arrObject.splice(0,1,termNo);
                    arrObject.splice(1,1,total);
                    let arr = []
                    arrObject.map(item=>{
                        arr.push(item.data)
                    })
                    this.value.push(arr);
                    
                })


                this.$nextTick(() => {
                    // $('.theader').find('th').eq(0).text('设备编号')
                    // $('.theader').find('th').eq(1).text('合计')
                    // $('.t1').find('th').eq(0).text('设备编号')
                    // $('.t1').find('th').eq(1).text('合计')
                    // console.log($('.out').find('tr'))
                    // let len=$('.out').find('tr').length
                    for (let i = 0; i < $('.out').find('tr').length; i++) {
                        for (let j = 0; j < $('.out').find('tr').eq(i).find('td').length; j++) {
                            if (j < 2) {
                                $('.out').find('tr').eq(i).find('td').eq(j).hide()
                            }
                        }
                        for (let j = 0; j < $('.out').find('tr').eq(i).find('th').length; j++) {
                            if (j < 2) {
                                $('.out').find('tr').eq(i).find('th').eq(j).hide()
                            }
                        }
                    }
                })

            } catch (e) {
                this.list.totalIncome = 0;
                this.list.refund = 0;
                this.list.total = 0;
                // this.list.wxPayCount = 0;
                // this.list.aliPayCount = 0;
                $('.text1').hide();
            } finally {
                this.$Indicator.close();
            }
            // console.log(JSON.parse(JSON.stringify(this.value)))
        },
        async search(type) {
            try {
                this.params.placeId = this.$route.query.placeId
                let { data } = await this.$http({
                    url: Search_ALL + '/' + this.$route.query.placeId,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }
                });
                // this.searchList = data.data.list
                data.data.list.map((item, index) => {
                    if (index == 0) {
                        item.select = "ye"
                    } else {
                        item.select = "no"
                    }
                })
                this.name = data.data.list;
                this.total = data.data.total;

            } catch (e) {
            }
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
        getSelect(item, index, name) {
            this.value = []
            this.params.subPlaceId = item.split('-')[1]
            this.loadData()

            this.name.splice(index, 1);
            this.name.unshift(name)
            this.name.map((item, index) => {
                if (index == 0) {
                    this.name[index].select = "ye"
                } else {
                    this.name[index].select = "no"
                }
            })
            // this.name[0].select="ye"
            // this.name[1].select="no"
            // this.name[2].select="no"
            this.showSe = false;
            this.imgUrl = require("../../../static/imgs_new/down.png");
        },
        dateFtt(fmt, date) {
            var o = {
                "M+": date.getMonth() + 1,                 //月份   
                "d+": date.getDate(),                    //日   
                "h+": date.getHours(),                   //小时   
                "m+": date.getMinutes(),                 //分   
                "s+": date.getSeconds(),                 //秒   
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                "S": date.getMilliseconds()             //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
    },
    mounted() {
        !this.$route.query.termNo ? this.search() : null
        this.loadData()

        $('.dateRange').html(Number(this.params.beginDate.split('/')[0]) + '-' + this.params.beginDate.split('/')[1] + '-' + this.params.beginDate.split('/')[2] + ' 至 ' + Number(this.params.endDate.split('/')[0]) + '-' + this.params.endDate.split('/')[1] + '-' + this.params.endDate.split('/')[2])


    }
};
