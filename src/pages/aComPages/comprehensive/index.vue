<template>
    <div id="comprehensive">
        <Row leftTop="终端在线查询" :to="{name:'OnLineSearch'}" arrow />
        <Row leftTop="终端更换记录" :to="{name:'ChangeRecord'}" arrow />
        <Row leftTop="投币记录查询" :to="{name:'CoinRecord'}" arrow />
        <Row leftTop="终端运行记录" :to="{name:'WorkingRecord'}" arrow />
        <Row leftTop="支付订单查询" :to="{name:'PayOrderSearch'}" arrow />
        <Row leftTop="退款记录查询" :to="{name:'RefundRecord'}" arrow />
        <Row leftTop="远程操作查询" :to="{name:'RemoteRecord'}" arrow />
    </div>
</template>

<script>
export default {
  name: "comprehensive"
};
</script>

<style lang="less">
@import "../../../styles/custom.less";
#comprehensive {
  background-color: @bg-color;
  min-height: 100%;
  .value-emty {
    color: #fff;
  }
}
</style>
