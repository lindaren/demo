<template>
    <div class="fy-loading-box">
        <div class="fy-loading-item" v-for="i in rows" :key="i">
            <div class="fy-loading-left">
                <p class="fy-row fy-row-20 fy-loading-animate"></p>
                <p class="fy-row fy-row-12 fy-loading-animate"></p>
            </div>
            <div class="fy-loading-right">
                <p class="fy-row fy-row-12 fy-loading-animate"></p>
                <p class="fy-row fy-row-20 fy-loading-animate"></p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'LoadingBox',
    props:{
        rows:{
            type:Number,
            default:1
        }
    }
};
</script>
<style lang="less">
.fy-generate-columns(24);
.fy-generate-columns(@n, @i: 1) when (@i =< @n) {
  .fy-row-@{i} {
    width: (@i * 100% / @n);
  }
  .fy-generate-columns(@n, (@i + 1));
}
.fy-loading-box {
  padding: 0 0.2rem;
  background-color: #fff;
  .fy-loading-item {
    height: 1.4rem;
    width: 100%;
    padding: 0.08rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #F2F5F6;
    .fy-loading-left{
        flex: 2;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .fy-loading-right{
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-end;
    }
    .fy-row{
        height: 0.28rem;
        background-color: #F2F5F6;
        margin-bottom: 0.1rem;
        border-radius: 1px;
    }
  }
}
.fy-loading-animate{
     background: -webkit-gradient(linear, left top, right top, from(rgba(207, 216, 220, 0.2)), color-stop(rgba(207, 216, 220, 0.4)), to(rgba(207, 216, 220, 0.2)));
    background: -webkit-linear-gradient(left, rgba(207, 216, 220, 0.2), rgba(207, 216, 220, 0.4), rgba(207, 216, 220, 0.2));
    background: -o-linear-gradient(left, rgba(207, 216, 220, 0.2), rgba(207, 216, 220, 0.4), rgba(207, 216, 220, 0.2));
    background: linear-gradient(90deg, rgba(207, 216, 220, 0.2), rgba(207, 216, 220, 0.4), rgba(207, 216, 220, 0.2));
    -webkit-animation: card-loading 1.4s ease infinite;
    animation: card-loading 1.4s ease infinite;
    background-size: 600% 600%;
    transform: translate3d(0,0,0);
}
@-webkit-keyframes card-loading {
  0%,
  100% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
@keyframes card-loading {
  0%,
  100% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
