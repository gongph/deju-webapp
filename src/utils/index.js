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
 * 格式化上万的金额
 */

export function formatMoney(money) {
  if (!money) return ''
  if (money >= 10000) return (money / 10000) + '万'
    return money
}