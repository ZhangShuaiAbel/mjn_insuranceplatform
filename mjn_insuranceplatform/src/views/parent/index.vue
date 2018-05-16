<template>
    <div class="adult">
        <div class="search">
          <div class="icon" v-if="Dist==false"><span class="zhan" @click="toggle()">展开</span><Icon type="ios-arrow-down"></Icon></div>
          <div class="icon" v-else><span class="zhan" @click="toggle()">收回</span><Icon type="ios-arrow-up"></Icon></div>
          <div class="row">
            <div class="row-title">年龄</div>
            <div class="row-content" v-for="(item,index) in insuranceAgeList" :key="index">
              <input type="radio" :id="'insuranceAge' + item.value" :value="item.value" v-model="insuranceAge" />
						  <label :for="'insuranceAge' + item.value">{{item.name}}</label>
            </div>
            <div class="row-main">
                <input type="text" v-model="fillAge" class="ivu-input" style="width:100px;margin-top: 14px;" placeholder="请输入周岁">
                <div class="btn" @click="handlePageNumber(page)">确定</div>
            </div>
          </div>
          <div class="row">
            <div class="row-title">保障类型</div>
            <div class="row-content" v-for="(item,index) in insuranceTypeList" :key="index">
              <input type="radio" :id="'insuranceType' + item.value" :value="item.value" v-model="insuranceType" />
						  <label :for="'insuranceType' + item.value">{{item.name}}</label>
            </div>
            <div class="row-content more" v-show="moreShow" @click="moreFun()">更多</div>
          </div>
          <div class="row">
            <div class="row-title">保额</div>
            <div class="row-content" v-for="(item,index) in insuranceAmountList" :key="index">
              <input type="radio" :id="'insuranceAmount' + item.value" :value="item.value" v-model="insuranceAmount" />
						  <label :for="'insuranceAmount' + item.value">{{item.name}}</label>
            </div>
          </div>
          <transition name="donghua">
            <div v-show="Dist">
                <div class="row">
              <div class="row-title">保费</div>
              <div class="row-content" v-for="(item,index) in insuranceFeeList" :key="index">
                <input type="radio" :id="'insuranceFee' + item.value" :value="item.value" v-model="insuranceFee" />
                <label :for="'insuranceFee' + item.value">{{item.name}}</label>
              </div>
            </div>
            <div class="row">
              <div class="row-title">保障期限</div>
              <div class="row-content" v-for="(item,index) in insurancePeriodList" :key="index">
                <input type="radio" :id="'insurancePeriod' + item.value" :value="item.value" v-model="insurancePeriod" />
                <label :for="'insurancePeriod' + item.value">{{item.name}}</label>
              </div>
            </div>
            <div class="row">
              <div class="row-title">更多选项</div>
              <div class="row-main">
                <span>性别</span>
                <Select v-model="gender" size="large" style="width:100px;margin-top:10px;">
                    <Option v-for="(item,index) in genderList" :key="index" :value="item.value">{{item.name}}</Option>
                </Select>
                <span>社保</span>
                <Select v-model="socialSociety" size="large" style="width:100px;margin-top:10px;">
                    <Option v-for="(item,index) in socialSocietyList" :key="index" :value="item.value">{{item.name}}</Option>
                </Select>
                <span>付费方式</span>
                <Select v-model="paymentMethod" size="large" style="width:100px;margin-top:10px;">
                  <Option v-for="(item,index) in paymentMethodList" :key="index" :value="item.value">{{item.name}}</Option>
                </Select>
                <div class="btn" @click="handlePageNumber(page)">开始搜索</div>
              </div>
            </div>
            </div>            
          </transition>
        </div>
        <div class="compared" v-show="isCompared">
          <div class="font">对比产品：</div>
          <div class="content" v-for="(item,index) in parentJSON" :key="index">
            <div class="name">{{item.name}}</div>
            <div class="close" @click="closeActive(item.id)">×</div>
          </div>
          <div class="btn" @click="cancelFun()">取消</div>
          <div class="btn" @click="comparedFun()">对比</div>
        </div>
        <div class="comparison">
          <div><span class="font" @click="comparisonFun(sortType,1)">销量</span><span class="ivu-table-sort"><i class="ivu-icon ivu-icon-arrow-up-b"></i> <i class="ivu-icon ivu-icon-arrow-down-b"></i></span></div>
          <div><span class="font" @click="comparisonFun(sortType,2)">性价比</span><span class="ivu-table-sort"><i class="ivu-icon ivu-icon-arrow-up-b"></i> <i class="ivu-icon ivu-icon-arrow-down-b"></i></span></div>
        </div>
        <Table :columns="tableTitles" :data="tableContent"></Table>
        <div class="adult_paging">
          <Page :total="total" :current="current" show-total @on-change="handlePageNumber"></Page>
        </div>
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex/mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { staticAdultTableTitle } from "@/static/staticData.js";
import isActiveData from "@/vuex/index.js";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "adult",
  data() {
    return {
      Dist: false,
      isCompared: false,
      insuranceTypeList: "",
      newinsuranceTypeList: "",
      moreShow: false,
      insuranceAge:"0",  //年龄
      fillAge:"",//填写的年龄
      insurancePeriod: "0", //保障期限
      insuranceFee: "0", //保费
      insuranceAmount: "0", //保额
      gender: "0", //性别
      socialSociety: "0", //有无社保
      insuranceType: "2", //保障类型
      paymentMethod: 0, //付费方式
      tableTitles: [],
      tableContent: [],
      total: 0,
      pages: 1,
      isActiveDatas: "",
      parentJSON: "",
      sortType: false
    };
  },

  computed: {
    ...mapState(["isActiveData"])
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 初始化数据
      vm.getInitData();
      vm.tableTitles = staticAdultTableTitle(vm).accident;
    });
  },
  mounted() {
    // this.insuranceTypeShow();
  },
  watch: {
    insuranceAge: function() {
      if(this.insuranceAge != ""){
        this.fillAge = "";
      }
      if (this.insuranceAge == "0") {
        this.insuranceTypeList = [
            { name: "意外", value: "2" }
          ];
        this.moreShow = true;
        this.handlePageNumber(1);
      } else if (this.insuranceAge == "4") {
        this.insuranceTypeList = [
          { name: "意外", value: "2" }
        ];
        this.moreShow = true;
        this.handlePageNumber(1);
      } else if (this.insuranceAge == "5") {
        this.insuranceTypeList = [
          { name: "意外", value: "2" }
        ];
        this.moreShow = true;
        this.handlePageNumber(1);
      }else if (this.insuranceAge == "6") {
        this.insuranceTypeList = [
          { name: "意外", value: "2" }
        ];
        this.moreShow = true;
        this.handlePageNumber(1);
      }
    },
    insurancePeriod: function() {
      this.handlePageNumber(1);
    },
    insuranceFee: function() {
      this.handlePageNumber(1);
    },
    insuranceAmount: function() {
      this.handlePageNumber(1);
    },
    insuranceType: function() {
      if (this.insuranceType == 2) {
        this.tableTitles = staticAdultTableTitle(this).accident;
      } else if (this.insuranceType == 3) {
        this.tableTitles = staticAdultTableTitle(this).severeIllness;
      } else if (this.insuranceType == 6) {
        this.tableTitles = staticAdultTableTitle(this).severeIllness;
      } else if (this.insuranceType == 1) {
        this.tableTitles = staticAdultTableTitle(this).medical;
      } else if (this.insuranceType == 5) {
        this.tableTitles = staticAdultTableTitle(this).lifeInsurance;
      }
      this.handlePageNumber(1);
    },
    parentJSON: function() {
      var parentJSON1 = JSON.parse(localStorage.getItem("parentJSON"));
      if (parentJSON1.length > 0) {
        this.isCompared = true;
      } else {
        this.isCompared = false;
      }
    },
    fillAge:function(){
      if(this.fillAge != ""){
        this.insuranceAge = "";
      }
    }
  },

  methods: {
    ...mapMutations({
      aaa: mutationTypes.AAA
    }),

    // 自定义排序
    sortMethod(a, b, type) {
      if (type === "asc") {
        return parseFloat(a) < parseFloat(b);
      } else {
        return parseFloat(a) > parseFloat(b);
      }
    },
    // 初始化数据
    getInitData() {
      let tasks = [];
      // 表格数据
      tasks.push(
        this.$http(connectURL.ParentTableData, {
          type: "GET",
          params: {
            insuranceAge: this.insuranceAge,
            insurancePeriod: this.insurancePeriod,
            insuranceFee: this.insuranceFee,
            insuranceAmount: this.insuranceAmount,
            gender: this.gender,
            socialSociety: this.socialSociety,
            insuranceType: this.insuranceType,
            paymentMethod: this.paymentMethod,
            startPage: 1,
            pageSize: 10
          }
        })
      );
      // 条件数据
      tasks.push(this.$http(connectURL.ParentConditionData));
      const task = Promise.all(tasks)
        .then(res => {
          let [ParentTableData, ParentConditionData] = res.map(item => {
            return item;
          });
          console.log(ParentTableData);
          // 失败
          if (
            ParentTableData.status != 200 &&
            ParentConditionData.status != 200
          ) {
            this.$Message.warning(ParentTableData.statusText);
            return;
          }
          // 设置总数
          this.total = ParentTableData.data.total;
          ParentTableData.data.rows.forEach((item, index) => {
            //设置对比状态
            item.isActive = false;
            //添加性价比
            item.valueFoeMoney = parseFloat(item.insured_amount / item.insurance_fee);
            // 转换意外伤残保障
            item.accidental_hurt = item.accidental_hurt / 1000000 + "万";
            // 转换意外身故保障
            item.accidental_die = item.accidental_die / 1000000 + '万';
            // 转换医疗免赔额
            item.insurance_free_amount = item.insurance_free_amount / 100 + '元';
            // 转换保费
            item.insurance_fee = item.insurance_fee / 100 + '元/年';
          });
          if (localStorage.parentJSON == "" || localStorage.parentJSON == undefined ) {
          } else {
            this.parentJSON = JSON.parse(localStorage.parentJSON);
            this.parentJSON.forEach((item, indexs) => {
              ParentTableData.data.rows.forEach((items, index) => {
                if (item.id == items.id) {
                  items.isActive = true;
                }
              });
            });
          }
          // 设置表格内容
          this.tableContent = ParentTableData.data.rows;
          // 设置搜索内容
          console.log(ParentConditionData)
          this.genderList = ParentConditionData.data.gender; //性别
          this.insuranceAgeList = ParentConditionData.data.insuranceAge; //年龄
          this.insurancePeriodList = ParentConditionData.data.insurancePeriod; //保障期限
          this.insuranceFeeList = ParentConditionData.data.insuranceFee; //保费
          this.insuranceAmountList = ParentConditionData.data.insuranceAmount; //保额
          this.socialSocietyList = ParentConditionData.data.socialSociety; //有无社保
          this.insuranceTypeList = ParentConditionData.data.insuranceType; //保障类型
          this.newinsuranceTypeList = this.insuranceTypeList;
          this.paymentMethodList = ParentConditionData.data.paymentMethod; //付费方式
          
          this.insuranceTypeList = [{ name: "意外", value: "2" }];
          this.moreShow = true;
          
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("网络异常或参数错误");
        });
    },
    // 对比
    handleContrast(params) {
      if (window.localStorage) {
        if (
          localStorage.parentJSON == "" ||
          localStorage.parentJSON == undefined
        ) {
          var array = [];
          localStorage.setItem("parentJSON", JSON.stringify(array));
        }
        if (params.row.isActive == false) {
          var parentJSON1 = JSON.parse(localStorage.getItem("parentJSON"));
          if (parentJSON1.length > 3) {
            this.$Message.error("选择过多，只能对比四组数据");
            return false;
          } else {
            parentJSON1.push({ name: params.row.name, id: params.row.id ,contrast_product_id : params.row.contrast_product_id});
            localStorage.setItem("parentJSON", JSON.stringify(parentJSON1));
            this.parentJSON = JSON.parse(localStorage.parentJSON);
            params.row.isActive = !params.row.isActive;
          }
        } else {
          var parentJSON2 = JSON.parse(localStorage.parentJSON);
          parentJSON2.forEach((item, index) => {
            console.log(item.id, params.row.id);
            if (item.id == params.row.id) {
              console.log(item);
              parentJSON2.splice(index, 1);
              localStorage.setItem("parentJSON", JSON.stringify(parentJSON2));
              this.parentJSON = JSON.parse(localStorage.parentJSON);
              params.row.isActive = !params.row.isActive;
            }
          });
        }
      }
      this.isActiveDatas = this.isActiveData;
      // this.aaa(this.isActiveData);
    },
    moreFun() {
      this.insuranceTypeList = this.newinsuranceTypeList;
      this.moreShow = false;
    },
    handlePageNumber(page) {
      this.pages = page; //获取当前页码
      // alert('当前页码'+ page)
      var insuranceAge = "";
      if(this.insuranceAge==""){
        insuranceAge = this.fillAge+"Y";
      }else{
        insuranceAge = this.insuranceAge;
      }
      this.$http(connectURL.ParentTableData, {
        type: "GET",
        params: {
          insuranceAge: insuranceAge,
          insurancePeriod: this.insurancePeriod,
          insuranceFee: this.insuranceFee,
          insuranceAmount: this.insuranceAmount,
          gender: this.gender,
          socialSociety: this.socialSociety,
          insuranceType: this.insuranceType,
          paymentMethod: this.paymentMethod,
          startPage: page,
          pageSize: 10
        }
      })
        .then(res => {
          // 失败
          if (res.status != 200) {
            this.$Message.warning(res.statusText);
            return;
          }
          // 设置总数
          this.total = res.data.total;
          res.data.rows.forEach((item, index) => {
            //添加isActive控制是否添加对比
            item.isActive = false;
            //添加性价比
            item.valueFoeMoney = parseFloat(
              item.insured_amount / item.insurance_fee
            );
            // 转换意外伤残保障
            item.accidental_hurt = item.accidental_hurt / 1000000 + "万";
            // 转换意外身故保障
            item.accidental_die = item.accidental_die / 1000000 + "万";
            // 转换医疗免赔额
            item.insurance_free_amount =
              item.insurance_free_amount / 100 + "元";
            // 转换保费
            item.insurance_fee = item.insurance_fee / 100 + "元/年";
            // 重疾保证金
            item.severe_illness_protect =
              item.severe_illness_protect / 1000000 + "万";
            // 重疾数量
            item.severe_illness_num = item.severe_illness_num + "个";
            // 重疾保证金
            item.severe_illness_die = item.severe_illness_die / 1000000 + "万";
            // 住院医疗
            item.hospitalization = item.hospitalization / 1000000 + "万";
            // 住院前后门急诊
            item.contain_hospitalization_clinic = item.contain_hospitalization_clinic / 1000000 + "万";
            // 普通门急诊
            item.general_clinic = item.general_clinic / 100 + "元";
            // 特殊门诊
            item.special_clinic = item.special_clinic / 1000000 + "万";
          });
          //改变对比状态
          if (this.parentJSON != "") {
            this.parentJSON.forEach((item, indexs) => {
              res.data.rows.forEach((items, index) => {
                if (item.id == items.id) {
                  items.isActive = true;
                }
              });
            });
          }
          // 设置表格内容
          this.tableContent = res.data.rows;
        })

        .catch(err => {
          this.$Message.error("网络异常或参数错误");
        });
    },
    closeActive(id) {
      var parentJSON2 = JSON.parse(localStorage.parentJSON);
      parentJSON2.forEach((item, index) => {
        if (item.id == id) {
          console.log(item);
          parentJSON2.splice(index, 1);
          localStorage.setItem("parentJSON", JSON.stringify(parentJSON2));
          this.parentJSON = JSON.parse(localStorage.parentJSON);
          this.handlePageNumber(this.pages);
        }
      });
    },
    cancelFun() {
      let removeLength = this.parentJSON.length;
      this.parentJSON.splice(0, removeLength);
      this.isCompared = false;
      localStorage.setItem("parentJSON", JSON.stringify([]));
      this.handlePageNumber(this.pages);
    },
    comparedFun() {
      let array = [];
      this.parentJSON.forEach((item, index) => {
        array.push(item.contrast_product_id);
      });
      let conrastIds = array.join(",");
      this.$router.push({ path: '/contrast?cashCardId='+conrastIds})  
    },
    comparisonFun(sortType, data) {
      let array = [];
      this.tableContent.forEach((item, index) => {
        if (data == 1) {
          array.push(item.sales_volume);
        } else {
          array.push(item.valueFoeMoney);
        }
      });
      const aaa = function(x, y) {
        if (sortType === false) {
          return parseFloat(x) < parseFloat(y);
        } else {
          return parseFloat(x) > parseFloat(y);
        }
      };
      let newList = [];
      console.log(array.sort(aaa));
      array.sort(aaa).forEach((item, index) => {
        this.tableContent.forEach((val, idx) => {
          if (data == 1) {
            if (val.sales_volume == item) {
              newList.push(val);
            }
          } else {
            if (val.valueFoeMoney == item) {
              newList.push(val);
            }
          }
        });
      });
      console.log(newList);
      for (var i = 0; i < newList.length; i++) {
        for (var j = i + 1; j < newList.length; ) {
          if (newList[i].id == newList[j].id) {
            //通过id属性进行匹配；
            newList.splice(j, 1); //去除重复的对象
          } else {
            j++;
          }
        }
      }
      if (this.parentJSON != "") {
        this.parentJSON.forEach((item, indexs) => {
          newList.forEach((items, index) => {
            if (item.id == items.id) {
              items.isActive = true;
            }
          });
        });
      }
      this.tableContent = newList;
      this.sortType = !this.sortType;
      console.log(newList);
    },
    toggle: function() {
      this.Dist = !this.Dist;
    }
  }
};
</script>

<style lang="less" src="./index.less">

</style>






