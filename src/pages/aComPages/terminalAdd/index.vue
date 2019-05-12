<template>
    <Form :rules="rules" :forms="form" ref="forms" class="put-approval-add">
        <div class="scrollBox">
            <BasicInfo :form="form"/>
        </div>
        <mt-button class="footer-button no-select" type="primary" @click="submit">提交</mt-button>
    </Form>
</template>
<script src="./script.js">
</script>
