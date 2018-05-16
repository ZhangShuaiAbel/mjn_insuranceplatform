<template>
    <div class="login">
        
        <div class="form" v-show="loginOneShow">
            <div class="font">登录</div>
            <div class="phone"><input type="text" v-model="phone" placeholder="请输入手机号"></div>
            <div class="code" v-show="ifCodeLogin">
                <input type="text" v-model="msgCode" placeholder="短信验证码">
                <div v-show="msgShow" class="btn1" @click="getCode">获取验证码</div>
                <div v-show="!msgShow" class="btn1">{{count}} s</div>
            </div>
            <div class="phone" v-show="ifPwdLogin"><input type="password" v-model="pwd" placeholder="请输入密码"></div>
            <button @click="codeIfFun">验证码登录</button>
            <button @click="forgetBtn">忘记密码</button>
            <div class="btn" @click="loginFun">登录</div>     
        </div>

        <div class="form" v-show="loginTwoShow">
            <div class="font">找回密码</div>
            <div class="phone"><input type="text" v-model="phone" placeholder="请输入手机号"></div>
            <div class="code">
                <input type="text" v-model="forgetMsgCode" placeholder="短信验证码">
                <div v-show="forgetmsgShow" class="btn1" @click="forgetGetCode">获取验证码</div>
                <div v-show="!forgetmsgShow" class="btn1">{{count}} s</div>
            </div>
            <div class="btn" @click="forgetFun">下一步</div>     
        </div>

        <div class="form" v-show="loginThreeShow">
            <div class="font">密码</div>
            <div class="phone"><input type="password" v-model="pwd" placeholder="请输入密码,为6-16位字母+数字"></div>
            <div class="phone"><input type="password" v-model="nextPwd" placeholder="再次输入密码"></div>
            <div class="btn" @click="resetPwdFun">重置密码</div>     
        </div>

        <div class="form" v-show="loginFourShow">
            <div class="font">重置成功</div>
        </div>
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
export default {
    name: 'login',
    data() {
        return {
            msgShow: true,
            forgetmsgShow: true,
            phone:"",
            msgCode:"",
            count: '',
            timer: null,
            loginOneShow : true,
            loginTwoShow : false,
            loginThreeShow : false,
            loginFourShow : false,
            pwd:"",
            nextPwd:"",
            ifCodeLogin : false,
            ifPwdLogin : true,
            forgetMsgCode : "",
        };
    },
    computed: {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        codeIfFun(){
            this.ifCodeLogin = true;
            this.ifPwdLogin = false;
        },
        forgetGetCode(){
            if(this.phone==""){
                this.$Message.error("手机号码不能为空");
            }else if(!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.phone))){
                this.$Message.error("手机号码格式有误");
            }else{
                this.$http(connectURL.sendSms, {
                    type: "GET",
                    params: {
                        mobile: this.phone,
                        type: "mod3",
                    }
                })
                .then(res => {
                    if(res.data.code=="0000"){
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.forgetmsgShow = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.forgetmsgShow = true;
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
                        type: "mod2",
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
        loginFun(){
            if(this.phone==""){
                this.$Message.error("手机号码不能为空");
            }else if(!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.phone))){
                this.$Message.error("手机号码格式有误");
            }else if(this.ifPwdLogin == true){
                if(this.pwd == ""){
                    this.$Message.error("密码不能为空");
                }else{
                    this.$http(connectURL.loginPwd, {
                        type: "GET",
                        params: {
                            mobile: this.phone,
                            pwd: this.pwd,
                        }
                    })
                    .then(res => {
                        console.log(res);
                        if(res.data.code=="0000"){
                            // document.cookie = res.data.res;
                            document.cookie = "token="+res.data.res;
                            alert(res.data.msg);
                        }else{
                            this.$Message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                    this.$Message.error("网络异常或参数错误");
                    });
                }  
            }else if(this.ifPwdLogin == false){
                if(this.msgCode == ""){
                    this.$Message.error("验证码不能为空");
                }else{
                    this.$http(connectURL.loginSms, {
                        type: "GET",
                        params: {
                            mobile: this.phone,
                            smsCode: this.msgCode,
                        }
                    })
                    .then(res => {
                        if(res.data.code=="0000"){
                            document.cookie = "token="+res.data.res;
                            alert(res.data.msg);
                        }else{
                            this.$Message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                    this.$Message.error("网络异常或参数错误");
                    });
                }  
            }
            
                     
        },
        forgetBtn(){
            this.loginOneShow = false;
            this.loginTwoShow = true;
        },
        forgetFun(){
            if(this.phone==""){
                this.$Message.error("手机号码不能为空");
            }else if(!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.phone))){
                this.$Message.error("手机号码格式有误");
            }else if(this.forgetMsgCode == ""){
                this.$Message.error("验证码不能为空");
            }else{
                this.$http(connectURL.checkSms, {
                    type: "GET",
                    params: {
                        mobile: this.phone,
                        smsCode: this.forgetMsgCode,
                        type: "mod3",
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code=="0000"){
                        this.loginTwoShow = false;
                        this.loginThreeShow = true;
                       
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(err => {
                this.$Message.error("网络异常或参数错误");
                }); 
            }
        },
        resetPwdFun(){
            var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if(this.pwd==""){
                this.$Message.error("密码不能为空");
            }else if(!reg.test(this.pwd)){
                this.$Message.error("密码格式有误");
            }else if(this.pwd != this.nextPwd){
                this.$Message.error("两次密码不一致");
            }else{
                this.$http(connectURL.resetPwd, {
                    type: "GET",
                    params: {
                        mobile: this.phone,
                        smsCode: this.forgetMsgCode,
                        pwd: this.pwd,
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code=="0000"){
                        this.loginThreeShow = false;
                        this.loginFourShow = true;
                    }else{
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(err => {
                this.$Message.error("网络异常或参数错误");
                }); 
            }            
        }
    }

}
</script>

<style lang="less" src="./index.less" ></style>