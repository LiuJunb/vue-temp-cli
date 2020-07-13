export const statusAdviceEcharts = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    top: '35%',
    right: 100,
    itemGap: 20,
    data: ['待处置', '办理中', '已办结']
  },
  color: ['#37B8FF', '#1FD6C1', '#8342FE'],
  series: [
    {
      name: '检察建议情况',
      type: 'pie',
      radius: ['30%', '50%'],
      avoidLabelOverlap: false,
      center: [ // //距离左右，上下距离的百分比
        '30%', '50%'
      ],
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 0, name: '待处置' },
        { value: 0, name: '办理中' },
        { value: 0, name: '已办结' }
      ]
    }
  ]
}
