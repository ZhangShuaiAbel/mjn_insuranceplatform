// 成人静态表格title


const staticAdultTableTitle = function(_this) {
    return {
        accident: [
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
                                    window.open(params.row.origin_url);
                                }
                            }
                        }, params.row.name)
                    ]);
                }
            },
            {
                title: '意外伤残保障',
                key: 'accidental_hurt',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
                  
            },
            {
                title: '意外身故保障',
                key: 'accidental_die',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '医疗赔付比例',
                key: 'payments_ratio',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '医疗免赔额',
                key: 'insurance_free_amount',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '保费',
                key: 'insurance_fee',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: ' ',
                key: '',
                width: 150,
                align: 'center',
                // statusType: false,
                render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px',
                              background : params.row.isActive ? '#FF9966' : '#caaaec',
                              "border-color":params.row.isActive ? '#FF9966' : '#caaaec',
                          },
                          on: {
                              click: () => {
                                _this.handleContrast(params)
                              }
                          }
                      }, params.row.isActive ? '取消对比' : '加入对比')
                  ]);
              }
            }
          ],
          severeIllness: [
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
                                    window.open(params.row.origin_url);
                                }
                            }
                        }, params.row.name)
                    ]);
                }
            },
            {
                title: '重疾数量',
                key: 'severe_illness_num',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
                  
            },
            {
                title: '癌症保障（暂无）',
                key: 'accidental_die',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '重疾保证金',
                key: 'severe_illness_protect',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '重疾身故保障金',
                key: 'severe_illness_die',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '等待期',
                key: 'waiting_times',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: '保费',
                key: 'insurance_fee',
                sortable: true,
                align: 'center',
                sortMethod: _this.sortMethod
            },
            {
                title: ' ',
                key: '',
                width: 150,
                align: 'center',
                // statusType: false,
                render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px',
                              background : params.row.isActive ? '#FF9966' : '#caaaec',
                              "border-color":params.row.isActive ? '#FF9966' : '#caaaec',
                          },
                          on: {
                              click: () => {
                                _this.handleContrast(params)
                              }
                          }
                      }, params.row.isActive ? '取消对比' : '加入对比')
                  ]);
              }
            }
        ],
        medical: [
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
                                  window.open(params.row.origin_url);
                              }
                          }
                      }, params.row.name)
                  ]);
              }
          },
          {
              title: '住院医疗',
              key: 'hospitalization',
              sortable: true,
              align: 'center',
              sortMethod: _this.sortMethod
                
          },
          {
              title: '住院前后门急诊',
              key: 'contain_hospitalization_clinic',
              sortable: true,
              align: 'center',
              sortMethod: _this.sortMethod
          },
          {
              title: '普通门急诊',
              key: 'general_clinic',
              sortable: true,
              align: 'center',
              sortMethod: _this.sortMethod
          },
          {
              title: '特殊门诊',
              key: 'special_clinic',
              sortable: true,
              align: 'center',
              sortMethod: _this.sortMethod
          },
          {
              title: '等待期',
              key: 'waiting_times',
              sortable: true,
              align: 'center',
              sortMethod: _this.sortMethod
          },
          {
            title: '免赔额',
            key: 'insurance_free_amount',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
          },
          {
              title: '保费',
              key: 'insurance_fee',
              sortable: true,
              align: 'center',
              sortMethod: _this.sortMethod
          },
          {
            title: ' ',
            key: '',
            width: 150,
            align: 'center',
            // statusType: false,
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px',
                          background : params.row.isActive ? '#FF9966' : '#caaaec',
                          "border-color":params.row.isActive ? '#FF9966' : '#caaaec',
                      },
                      on: {
                          click: () => {
                            _this.handleContrast(params)
                          }
                      }
                  }, params.row.isActive ? '取消对比' : '加入对比')
              ]);
          }
          }
      ],
      lifeInsurance: [
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
                                window.open(params.row.origin_url);
                            }
                        }
                    }, params.row.name)
                ]);
            }
        },
        {
            title: '身故保险金',
            key: 'accidental_die',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
              
        },
        {
            title: '全残保险金',
            key: 'accidental_hurt',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
        },
        {
            title: '重大疾病保险金（暂无）',
            key: 'severe_illness_protect',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
        },
        {
            title: '疾病数量',
            key: 'severe_illness_num',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
        },
        {
            title: '等待期',
            key: 'waiting_times',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
        },
        {
            title: '保费',
            key: 'insurance_fee',
            sortable: true,
            align: 'center',
            sortMethod: _this.sortMethod
        },
        {
            title: ' ',
            key: '',
            width: 150,
            align: 'center',
            // statusType: false,
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px',
                          background : params.row.isActive ? '#FF9966' : '#caaaec',
                          "border-color":params.row.isActive ? '#FF9966' : '#caaaec',
                      },
                      on: {
                          click: () => {
                            _this.handleContrast(params)
                          }
                      }
                  }, params.row.isActive ? '取消对比' : '加入对比')
              ]);
          }
        }
      ]
    }
}


export {
    staticAdultTableTitle
};