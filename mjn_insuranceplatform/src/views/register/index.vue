<template>
    <div class="register">
        
        <div class="form" v-show="regOneShow">
            <div class="font">注册</div>
            <div class="phone"><input type="text" v-model="phone" placeholder="请输入手机号"></div>
            <div class="code">
                <input type="text" v-model="msgCode" placeholder="短信验证码">
                <div v-show="msgShow" class="btn1" @click="getCode">获取验证码</div>
                <div v-show="!msgShow" class="btn1">{{count}} s</div>
            </div>
            <div class="btn" @click="registerFun">注册</div>     
        </div>
        <div class="form" v-show="regTwoShow">
            <div class="font">密码</div>
            <div class="phone"><input type="password" v-model="pwd" placeholder="请输入密码,为6-16位字母+数字"></div>
            <div class="phone"><input type="password" v-model="nextPwd" placeholder="再次输入密码"></div>
            <div class="btn" @click="realRegisterFun">注册</div>     
        </div>
        <div class="form" v-show="regThreeShow">
            <div class="font">注册成功</div>
            <div class="shu-phone">请输入年龄<input type="password" v-model="nextPwd">岁</div>
            <div class="bi-btn" @click="comparingFun">年费比较保险产品</div>     
        </div>
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
export default {
    name: 'register',
    data() {
        return {
            msgShow: true,
            phone:"",
            msgCode:"",
            count: '',
            timer: null,
            regOneShow : true,
            regTwoShow : false,
            regThreeShow : false,
            pwd:"",
            nextPwd:"",
        };
    },
    computed: {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        getCode(){
            if(this.phone==""){
                this.$Message.error("手机号码不能为空");
            }else if(!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.phone))){
                this.$Message.error("手机号码格式有误");
            }else{
                this.$http(connectURL.sendSms, {
                    type: "GET",
                    params: {
                        mobile: this.phone,
                        type: "mod1",
                    }
                })
                .then(res => {
                    if(res.data.code=="0000"){
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.msgShow = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.msgShow = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(err => {
                this.$Message.error("网络异常或参数错误");
                });
            }           
        },
        registerFun(){
            if(this.phone==""){
                this.$Message.error("手机号码不能为空");
            }else if(!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.phone))){
                this.$Message.error("手机号码格式有误");
            }else if(this.msgCode == ""){
                this.$Message.error("验证码不能为空");
            }else{
                this.$http(connectURL.checkSms, {
                    type: "GET",
                    params: {
                        mobile: this.phone,
                        smsCode: this.msgCode,
                        type: "mod1",
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code=="0000"){
                        this.regOneShow = false;
                        this.regTwoShow = true;
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(err => {
                this.$Message.error("网络异常或参数错误");
                }); 
            }
        },
        realRegisterFun(){
            var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if(this.pwd==""){
                this.$Message.error("密码不能为空");
            }else if(!reg.test(this.pwd)){
                this.$Message.error("密码格式有误");
            }else if(this.pwd != this.nextPwd){
                this.$Message.error("两次密码不一致");
            }else{
                this.$http(connectURL.register, {
                    type: "GET",
                    params: {
                        mobile: this.phone,
                        smsCode: this.msgCode,
                        pwd: this.pwd,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code=="0000"){
                        this.regTwoShow = false;
                        this.regThreeShow = true;
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(err => {
                this.$Message.error("网络异常或参数错误");
                }); 
            }
        },
        comparingFun(){
            alert(1111)
        }
    }

}
</script>

<style lang="less" src="./index.less" ></style>