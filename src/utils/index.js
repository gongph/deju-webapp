/**
 * 贷款类型
 * @type {Map}
 */

export const loanTypes = new Map([
  ['SMALLMICROLOAN', '小微贷款']
])

/**
 * 教育程度
 */

export const educates = [[
  {
    value: '硕士/博士/研究生',
    label: '硕士/博士/研究生',
    children: []
  },
  {
    value: '本科',
    label: '本科',
    children: []
  },
  {
    value: '大专',
    label: '大专',
    children: []
  },
  {
    value: '高职',
    label: '高职',
    children: []
  },
  {
    value: '高中',
    label: '高中',
    children: []
  },
  {
    value: '中专技校',
    label: '中专技校',
    children: []
  },
  {
    value: '初中/小学',
    label: '初中/小学',
    children: []
  },
  {
    value: '海外',
    label: '海外',
    children: []
  }
]]

/**
 * 婚姻状况
 */

export const maritalStatus = [[
  { value: '已婚', label: '已婚', children: [] },
  { value: '未婚', label: '未婚', children: [] }
]]

/**
 * 产品利率表
 */

export const productRates = {
  '灵用金': [
    { label: 3, value: 3, rate: 0.0158 },
    { label: 6, value: 6, rate: 0.0128 },
    { label: 12, value: 12, rate: 0.0098 },
    { label: 24, value: 24, rate: 0.0078 }
  ],
  '信用金': [
    { label: 3, value: 3, rate: 0.0138 },
    { label: 6, value: 6, rate: 0.0118 },
    { label: 12, value: 12, rate: 0.0088 },
    { label: 24, value: 24, rate: 0.0068 }
  ],
  '快闪金': [
    { label: 3, value: 3, rate: 0.0138 },
    { label: 6, value: 6, rate: 0.0118 },
    { label: 12, value: 12, rate: 0.0088 },
    { label: 24, value: 24, rate: 0.0068 }
  ]
}


/**
 * 格式化上万的金额
 */

export function formatMoney(money) {
  if (!money) return ''
  if (money >= 10000) return (money / 10000) + '万'
    return money
}

/**
 * Object clone
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}