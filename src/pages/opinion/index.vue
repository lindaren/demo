<template>
    <div class="option">
        <div class="option_top">
            <span v-for="item in headerType" :class="item.select=='ye'?'option_bo':''" @click="switcher(item)">{{item.name}}</span>
        </div>
        <!-- <div class="option_h"></div> -->
        <!-- 意见反馈 -->
        <div class="feedback" v-show="feedback">
            <div class="option_h"></div>
            <div class="option_co">
                <textarea name="" id="" v-model="form.info" placeholder="请输入您的宝贵意见" cols="30" rows="10"></textarea>
                <ImageCell v-model="form.image" :fileLen="30" />
            </div>
            <div class="option_co">
                <div>请选择反馈类型</div>
                <div>
                    <div class="option_ty" v-for="(item,index) in type" @click="gitItem(item,index)">
                        <img :src="item.select=='ye'?selUrl:noUrl" alt="">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="option_button" @click="submit()">
                提交
            </div>
        </div>
        <!-- 历史记录 -->
        <div class="history" v-show="history">
            <div v-for="item in historyArr">
                <div class="option_h"></div>
                <div class="history_a">
                    <div class="history_top">
                        <div class="history_right">
                            <img src="../../../static/imgs_new/ask.png" alt="">
                        </div>
                        <div class="history_left">
                            <div class="history_left1">{{item.name}}</div>
                            <div class="history_left2">{{item.time}}</div>
                            <div class="history_img">
                                <span v-for="(img,index) in item.img" :class="'history_span'+index">
                                    <span class="law-image" :style="{backgroundImage: 'url(' + img + ')'}"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="history_footer">
                        <div class="history_right"> </div>
                        <div class="history_f">
                            <div>
                                <span class="history_time">{{item.endTime}}</span>
                                <span class="history_ask">答</span>
                            </div>
                            <div>{{item.askName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
</style>