import BaseUI from 'BaseUI'
const { SearchType } = BaseUI.AdvancedSearch
const labelWidth = null // 130px
const colWidth = '280px' // 220 280
export const adSearchConfig = [
  {
    ItemType: SearchType.custom,
    customSlot: 'url',
    fieldId: 'url',
    defaultValue: undefined,
    labelName: '网址',
    labelWidth: labelWidth,
    style: {
      width: colWidth
    },
    rules: [
      { required: false, message: '请输入自定义名称', trigger: 'blur' }
    ],
    placeholder: '请输入内容'
  },

  {
    ItemType: SearchType.selectAndInput,
    labelName: '城市',
    formItem_1: {
      fieldId: 'area',
      rules: [
        { required: false, message: '请选择活动区域', trigger: 'change' }
      ],
      clearable: true,
      placeholder: '选城市',
      defaultValue: undefined,
      style: {
        width: '100px'
      },
      selectList: [
        {
          label: '广州',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        }
      ]
      // todo ...  其它的属性查找 element select 组件属性
    },
    formItem_2: {
      fieldId: 'address',
      defaultValue: null,

      rules: [
        { required: false, message: '请输入详细地址', trigger: 'blur' }
      ],
      placeholder: '请输入详细地址',
      style: {
        width: '280px'
      }
      // todo ...  其它的属性查找 element input 组件属性
    }
  },
  {
    ItemType: SearchType.default,
    fieldId: 'name',

    defaultValue: undefined,
    labelName: '用户名称',
    labelWidth: labelWidth,
    style: {
      width: colWidth
    },
    rules: [
      { required: false, message: '请输入用户名称', trigger: 'blur' }
    ],
    placeholder: '请输入用户名称'
    // todo ...  其它的属性查找 element input 组件属性
  },
  {
    ItemType: SearchType.select,
    fieldId: 'sex',
    defaultValue: null,
    labelName: '性别',
    clearable: true,
    rules: [
      { required: false, message: '请选择性别', trigger: 'change' }
    ],
    placeholder: null,
    labelWidth: labelWidth,
    style: {
      width: colWidth
    },
    selectList: [
      {
        label: '男',
        value: '1'
      },
      {
        label: '女',
        value: '2'
      }
    ]
    // todo ...  其它的属性查找 element select 组件属性
  },
  {
    ItemType: SearchType.selectDataAndTime,
    labelName: '出生时间',
    required: false, // 显示红点
    style: {
      width: '290px'
    },
    formItem_1: {
      fieldId: 'data1',
      defaultValue: null,

      rules: [
        { type: 'date', required: false, message: '请选出生日期', trigger: 'change' }
      ],
      placeholder: null
    },
    formItem_2: {
      fieldId: 'time_1',
      defaultValue: null,

      rules: [
        { type: 'date', required: false, message: '请选择时间', trigger: 'change' }
      ],
      placeholder: null
    }
  },
  {
    ItemType: SearchType.selectDateRange,
    fieldId: 'createDate',
    // defaultValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    // defaultValue: ['2020-03-08', '2020-03-09'],
    defaultValue: null,
    labelName: '创建时间',
    valueFormat: 'yyyy-MM-dd',
    labelWidth: labelWidth,
    style: {
      width: colWidth
    },
    rules: [
      { required: false, message: '请选择时间', trigger: 'change' }
    ],
    placeholder: null
    // todo ...  其它的属性查找 element data-picker 组件属性
  },
  {
    ItemType: SearchType.selectDate,
    fieldId: 'startDate',
    defaultValue: null,
    labelName: '时间1',
    valueFormat: 'yyyy-MM-dd',
    rules: [
      // { type: 'date', required: false, message: '请选择时间', trigger: 'change' }
      { type: 'string', required: false, message: '请选择时间', trigger: 'change' }
    ],
    placeholder: null,
    labelWidth: labelWidth,
    style: {
      width: colWidth
    }
    // todo ...  其它的属性查找 element data-picker 组件属性
  },
  {
    ItemType: SearchType.radios,
    fieldId: 'radios_11',
    defaultValue: '',
    labelName: '请选择活动资源',
    labelWidth: labelWidth,
    style: {
      width: colWidth
    },
    radioList: [
      {
        label: '线上品牌商赞助'
      },
      {
        label: '线下场地免费'
      }
    ],
    rules: [
      { required: false, message: '请选择活动资源', trigger: 'change' }
    ],
    placeholder: null
    // todo ...  其它的属性查找 element radio 组件属性
  },
  {
    ItemType: SearchType.checkboxs,
    fieldId: 'check_box_1',
    defaultValue: [],
    labelName: '活动性质',
    labelWidth: labelWidth,
    style: {
      width: colWidth
    },
    checkboxList: [
      {
        label: '美食/餐厅线上活动'
      },
      {
        label: '地推活动'
      },
      {
        label: '线下主题活动'
      }
    ],
    rules: [
      { type: 'array', required: false, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    placeholder: null
    // todo ...  其它的属性查找 element checkbox 组件属性
  }
]
