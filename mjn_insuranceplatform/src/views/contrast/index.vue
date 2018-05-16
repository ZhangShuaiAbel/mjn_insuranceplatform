<template>
    <div class="contrast">
      <div class="contrast_table">
        <div class="ivu-collapse">
          <div class="ivu-collapse-item contrast-header">
            <div class="ivu-collapse-header">
              <span class="title">计划名称</span>
              <ul class="contrast_ul">
                <li v-for="(item,index) in proName" :key="index" @click="originUrlFun(item.originUrl)">{{item.name}}</li>
              </ul>
            </div>
            <div class="collapse-content">
              <div class="box"></div>
              <div class="contrast_main">
                <div class="box-com" v-for="(item,index) in collectionArray" :key="index">
                  <div class="contrast_main_list" >
                      <p>{{item.insuranceFee/100}}元/年</p>
                      <a href="javascript:;" class="a_bgk" @click="collectionFun(item)" v-if="item.isActive">取消收藏</a>
                      <a href="javascript:;" @click="collectionFun(item)" v-else>加入收藏</a>                      
                      <p>产品条款</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="app_content">
          <collapse v-model="value1">
              <panel name="1">
                基本信息                  
                <div class="content" slot="content"> 
                  <div class="con-header">等待期</div>
                  <div class="con-font" v-for="(item,index) in waitingTimesArray" :key="index">{{item}}天</div>
                </div>                
                <div class="content" slot="content"> 
                  <div class="con-header">保障期限</div>
                  <div class="con-font" v-for="(item,index) in insuredPeriodArray" :key="index">
                    <div v-if="item/365 < 1">{{item}}天</div>
                    <div v-else-if="item/365 > 50">至50周岁</div>
                    <div v-if="item/365 < 50">{{item/365}}年</div>
                  </div>
                </div>
                <div class="content" slot="content"> 
                  <div class="con-header">年龄限制</div>
                  <div  class="con-font" v-for="(item,index) in ageArray" :key="index">
                    <div v-if="item.ageLower=='999'">0岁</div>
                    <div v-else>{{item.ageLower}} - {{item.ageUpper}}岁</div>
                  </div>
                </div>
              </panel>
              <panel name="2">
                  意外
                  <div class="content" slot="content"> 
                    <div class="con-header">意外伤残保险金</div>
                    <div class="con-font" v-for="(item,index) in accidentalHurtArray" :key="index">{{item/1000000}}万</div>
                  </div>                
                  <div class="content" slot="content"> 
                    <div class="con-header">意外身故保险金</div>
                    <div class="con-font" v-for="(item,index) in accidentalDieArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">意外医疗免赔额</div>
                    <div class="con-font" v-for="(item,index) in insuranceFreeAmountArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">意外医疗赔付比例</div>
                    <div class="con-font" v-for="(item,index) in paymentsRatioArray" :key="index">{{item}}</div>
                  </div>
              </panel>
              <panel name="3">
                  重疾
                  <div class="content" slot="content"> 
                    <div class="con-header">重疾数量</div>
                    <div class="con-font" v-for="(item,index) in severeIllnessNumArray" :key="index">{{item}}个</div>
                  </div>                  
                  <div class="content" slot="content"> 
                    <div class="con-header">重疾保险金</div>
                    <div class="con-font" v-for="(item,index) in severeIllnessProtectArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">重疾身故保障金</div>
                    <div class="con-font" v-for="(item,index) in severeIllnessDieArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">重疾等待期</div>
                    <div class="con-font" v-for="(item,index) in waitingTimesArray" :key="index">{{item}}天</div>
                  </div>
              </panel>
              <panel name="4">
                  医疗
                  <div class="content" slot="content"> 
                    <div class="con-header">住院医疗</div>
                    <div class="con-font" v-for="(item,index) in hospitalizationArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  
                  <div class="content" slot="content"> 
                    <div class="con-header">住院前后门诊</div>
                    <div class="con-font" v-for="(item,index) in containHospitalizationClinicArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">普通门急诊</div>
                    <div class="con-font" v-for="(item,index) in generalClinicArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">特殊门诊</div>
                    <div class="con-font" v-for="(item,index) in specialClinicArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">医疗免赔额</div>
                    <div class="con-font" v-for="(item,index) in insuranceFreeAmountArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">医疗等待期</div>
                    <div class="con-font" v-for="(item,index) in waitingTimesArray" :key="index">{{item}}天</div>
                  </div>
              </panel>
              <panel name="5">
                  寿险
                  <div class="content" slot="content"> 
                    <div class="con-header">身故保险金</div>
                    <div class="con-font" v-for="(item,index) in accidentalDieArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  
                  <div class="content" slot="content"> 
                    <div class="con-header">全残保险金</div>
                    <div class="con-font" v-for="(item,index) in accidentalHurtArray" :key="index">{{item/1000000}}万</div>
                  </div>
                  <div class="content" slot="content"> 
                    <div class="con-header">寿险等待期</div>
                    <div  class="con-font" v-for="(item,index) in waitingTimesArray" :key="index">{{item}}天</div>
                  </div>
              </panel>
          </collapse>
      </div>
  </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex/mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { staticAdultTableTitle } from '@/static/staticData.js';

import { 
  mapState, 
  mapGetters, 
  mapMutations, 
  mapActions 
} from "vuex";

export default { 
  name: "adult",
  data() {
    return {
      spinShow: true,
      value1:[1,2,3,4,5],
      accordion:true,
      proName:[],//name
      collectionArray:[],//收藏
      waitingTimesArray:[],//等待期：天
      insuredPeriodArray:[],//保障期限 单位天，月*30，年*365
      ageArray:[],//年龄限制
      accidentalHurtArray:[],//意外伤残保额
      accidentalDieArray:[],//意外身故保额
      paymentsRatioArray:[],//赔付比例
      severeIllnessNumArray:[],//重疾数量
      severeIllnessProtectArray:[],//重疾保额
      severeIllnessDieArray:[],//重疾身故保额
      hospitalizationArray:[],//住院治疗保额
      containHospitalizationClinicArray:[],//住院前后门急诊保额
      generalClinicArray:[],//普通门诊保额
      specialClinicArray:[],//特殊门诊保额
      insuranceFreeAmountArray:[],//免赔额
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      // 初始化数据
      vm.getInitData();
    })
  },
  mounted() {},

  computed: {},

  methods: {
    // 初始化数据
    getInitData() {
      this.$http(connectURL.ProductContrast, {
        type: "GET",
        params: {
          conrastIds: this.$route.query.cashCardId,
        }
      })
        .then(res => {
          // 失败
          if (res.status != 200) {
            this.$Message.warning(res.statusText);
            return;
          }
          let dataAll = res.data;
          console.log(dataAll)
          dataAll.forEach((item, indexs) => {
            item.isActive = false;
            this.proName.push({"name":item.product.name,"originUrl":item.product.originUrl});
            this.collectionArray.push({"insuranceFee":item.detail.insuranceFee,"productId":item.product.id,"detailId":item.detail.id,"isActive":item.isActive});
            this.waitingTimesArray.push(item.detail.waitingTimes);
            this.insuredPeriodArray.push(item.detail.insuredPeriod);
            this.ageArray.push({"ageUpper":item.product.ageRangeUpper,"ageLower":item.product.ageRangeLower});
            this.accidentalHurtArray.push(item.detail.accidentalHurt);
            this.accidentalDieArray.push(item.detail.accidentalDie);
            this.paymentsRatioArray.push(item.detail.paymentsRatio);
            this.severeIllnessNumArray.push(item.detail.severeIllnessNum);
            this.severeIllnessProtectArray.push(item.detail.severeIllnessProtect);
            this.severeIllnessDieArray.push(item.detail.severeIllnessDie);
            this.hospitalizationArray.push(item.detail.hospitalization);
            this.containHospitalizationClinicArray.push(item.detail.containHospitalizationClinic);
            this.generalClinicArray.push(item.detail.generalClinic);
            this.specialClinicArray.push(item.detail.specialClinic);
            this.insuranceFreeAmountArray.push(item.detail.insuranceFreeAmount);
          });
          console.log(dataAll);
        })

        .catch(err => {
          this.$Message.error("网络异常或参数错误");
        });
    },
    collectionFun(data){
      if(data.isActive==false){
        this.$http(connectURL.addFavorite, {
          type: "GET",
          params: {
            productId: data.productId,
            detailId: data.detailId,
          }
        })
        .then(res => {
          console.log(res.data.msg);
          if(res.data.code=="0000"){
            this.collectionArray.forEach((item,indexs) => {
              if(item.productId==data.productId){
                  item.isActive=true;    
              }
            })
          }else if(res.data.code=="-1"){
              this.$router.push({ path: '/login'})  
          }
        })
        .catch(err => {
          this.$Message.error("网络异常或参数错误");
        });
      }else{
        this.$http(connectURL.cancelFavorite, {
          type: "GET",
          params: {
            productId: data.productId,
            detailId: data.detailId,
          }
        })
        .then(res => {
          console.log(res.data.msg);
          if(res.data.code=="0000"){
            this.collectionArray.forEach((item,indexs) => {
              if(item.productId==data.productId){
                  item.isActive=false;    
              }
            })
          }else if(res.data.code=="-1"){
              this.$router.push({ path: '/login'})  
          }
        })
        .catch(err => {
          this.$Message.error("网络异常或参数错误");
        });
      }
    },
    originUrlFun(data){
      window.open(data);
    }
  }
};
</script>

<style lang="less" src="./index.less"> </style>






