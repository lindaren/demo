<template>
    <div class="formBox">
        <Form :rules="rules" :forms="form" ref="forms" class="put-approval-add">
            <Cell label="存放仓库" required v-model="form.storeId" @change="changValue" :list="storeList" />
            <Input label="撤机原因" v-required  v-model="form.note" class="border-bottom"></Input>
            <mt-button class="footer-button no-select" type="primary" @click="termDelete">撤机</mt-button>
        </Form>
    </div>
</template>
<script src="./script.js">
</script>  