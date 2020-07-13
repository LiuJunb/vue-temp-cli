import BaseUI from 'BaseUI'
const { SearchType } = BaseUI.AdvancedSearch
export const adSearchConfig = [

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
    ItemType: SearchType.selectDateRange,
    fieldId: 'createDate',
    defaultValue: null,
    labelName: '创建时间',
    valueFormat: 'yyyy-MM-dd',
    // labelWidth: '150px',
    rules: [
      { required: false, message: '请选择时间', trigger: 'change' }
    ],
    placeholder: null,
    style: {
      width: '260px'
    }
  }

]
