<template>
    <div class="formBox">
        <Form :rules="rules" :forms="form" ref="forms" class="put-approval-add">
            <Input label="旧板卡编号" v-model="form.comAdd1" class="border-bottom" disabled></Input>
            <Cell label="存放仓库" v-model="form.storeId" :list="storeList" />
            <TerminalCell required label="新板卡编号" v-model="form.comAdd2" @change="terminalChange" placeholder="请选择" />
            <Input label="旧板币值" v-model="form.coin1" class="border-bottom" disabled></Input>
            <Input label="新板币值" v-model="form.coin2" class="border-bottom" v-required></Input>
            <Cell required label="换板故障" v-model="form.errorType" :list="chgCardErrorList" />
            <Input label="备注" v-model="form.note" class="border-bottom"></Input>
            <mt-button class="footer-button no-select" type="primary" @click="termChange">换板</mt-button>
        </Form>
    </div>
</template>
<script src="./script.js">
</script>
