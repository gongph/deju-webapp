/**
 * 贷款类型
 * @type {Map}
 */

export const loanTypes = new Map([
  ['SMALLMICROLOAN', '小微贷款']
])

/**
 * 格式化上万的金额
 */

export function formatMoney(money) {
  if (!money) return ''
  if (money >= 10000) return (money / 10000) + '万'
    return money
}