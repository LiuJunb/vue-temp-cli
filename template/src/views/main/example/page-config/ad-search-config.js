import BaseUI from 'BaseUI'
const { SearchType } = BaseUI.AdvancedSearch
export const adSearchConfig = [
  {
    ItemType: SearchType.custom,
    customSlot: 'url',
    fieldId: 'url',
    defaultValue: undefined,
    labelName: '网址',
    // labelWidth: '70px',

    style: {
      width: '280px'
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
    }
  },

  {
    ItemType: SearchType.default,
    fieldId: 'name',

    defaultValue: undefined,
    labelName: '用户名称',
    style: {
      width: '280px'
    },
    rules: [
      { required: false, message: '请输入用户名称', trigger: 'blur' }
    ],
    placeholder: '请输入用户名称'
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
    style: {
      width: '280px'
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
  }
]
