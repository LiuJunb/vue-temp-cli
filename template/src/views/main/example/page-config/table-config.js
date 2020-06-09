export const tabColumnConfig = [
  {
    prop: 'name',
    label: '姓名'
    // width: '180px'
  },
  {
    prop: 'age',
    label: '年龄',
    // width: '180px',
    sortable: true,
    slotColName: 'age' // 需要自定义列
  },
  {
    prop: 'sex',
    label: '性别',
    // width: '180px'
    slotColName: 'sex' // 需要自定义列
  },
  {
    prop: 'remark',
    label: '内容',
    // width: '380px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'addressNow',
    label: '地址'
  },
  {
    prop: 'operation',
    label: '操作',
    // width: '200px',
    slotColName: 'operation' // 需要自定义列
  }

]
