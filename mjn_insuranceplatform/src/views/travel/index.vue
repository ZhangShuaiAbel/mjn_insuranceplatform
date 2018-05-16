<template>
    <div class="travel">
        <Table :columns="tableTitles" :data="tableContent"></Table>
        <div class="adult_paging">
          <Page :total="total" :current="current" show-total @on-change="getInitData"></Page>
        </div>
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
export default {
    name: 'travel',
  data() {
    return {
        tableTitles: [
            {
                title: '保险名称',
                key: 'name',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                    window.open(params.row.originUrl);
                                }
                            }
                        }, params.row.name)
                    ]);
                }
            },
            {
                title: '保额',
                key: 'insuredAmount',
                align: 'center',
                  
            },
            {
                title: '保费',
                key: 'insuredFee',
                align: 'center',
            },
            {
                title: '期限',
                key: 'insuredPeriod',
                align: 'center',
            },
            {
                title: '保障范围',
                key: 'insuredType',
                align: 'center',
            },
            {
                title: '年龄限制',
                key: 'ageRange',
                align: 'center',
            },
            {
                title: ' ',
                key: '',
                width: 150,
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px',
                              background : '#FF9966',
                              "border-color":'#FF9966',
                          },
                          on: {
                              click: () => {
                                this.uncollectFun(params)
                              }
                          }
                      },'取消收藏'),
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px',
                              background : '#caaaec',
                              "border-color":'#caaaec',
                          },
                          on: {
                              click: () => {
                                window.open(params.row.originUrl);
                              }
                          }
                      }, '购买')
                  ]);
              }
            }
        ],
          
        tableContent: [],
        total: 0,
        page: 1,
    };
  },

  computed: {},

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 初始化数据
      vm.getInitData();
    });
  },
  mounted() {},
  watch: {},

  methods: {
    // 初始化数据
    getInitData(page) {
        this.page = page;
        this.$http(connectURL.queryMyFavorite, {
          type: "GET",
          params: {
            startPage: 1,
            pageSize: 10
          }
        })
        .then(res => {
          console.log(res);
          // 失败
          if (res.status != 200) {
            this.$Message.warning(res.statusText);
            return;
          }else if(res.data.code=="-1"){
              this.$router.push({ path: '/login'})  
          }else{
            // 设置总数
            this.total = res.data.total;
            // 设置表格内容
            res.data.res.rows.forEach((item, index) => {
                // 保额
                item.insuredAmount = item.insuredAmount / 1000000 + "万";
                // 保费 
                item.insuredFee = item.insuredFee / 100 + '元/年';
            });
            this.tableContent = res.data.res.rows;
          }


        })
        .catch(err => {
          console.log(err);
          this.$Message.error("网络异常或参数错误");
        });
    },
    uncollectFun(data){
        console.log(data)
        this.$http(connectURL.cancelFavorite, {
          type: "GET",
          params: {
            productId: data.row.productId,
            detailId: data.row.detailId,
          }
        })
        .then(res => {
          console.log(res.data.msg);
          if(res.data.code=="0000"){
              this.getInitData();
          }
        })
        .catch(err => {
          this.$Message.error("网络异常或参数错误");
        });
    }
  }
};
</script>

<style lang="less" src="./index.less" scoped></style>