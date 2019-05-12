<template>
    <Form :rules="rules" :forms="form" ref="forms" class="put-approval-add">
        <div class="scrollBox">
            <BasicInfo :form="form" @company="company" v-if="describe!='contract'" />
            <BasicCon :form="form" :billTypeList="billType" v-if="describe!='basic'" />
        </div>
        <mt-button class="footer-button no-select" type="primary" @click="submit">提交</mt-button>
    </Form>
</template>
<script src="./script.js">
</script>
