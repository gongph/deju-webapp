import localforage from 'localforage'

const getters = {
  // 用户登录凭证
  token: state => state.user.token,
  // 产品
  product: state => state.product.product,
  // 申请额度和期限信息
  applyInfo: state => state.product.applyInfo,
  // 申请的表单信息
  applyInfoForm: state => state.product.applyInfoForm,
  // 持久化的申请表单信息
  ApplyInfoFormData: () => {
    return localforage.getItem('ApplyInfoFormData')
  },
  // 个人信息
  personalInfo: state => state.product.personalInfo,
  // 头像
  avatar: state => state.user.avatar,
  // 登录名
  name: state => state.user.name,
  // 用户介绍
  introduction: state => state.user.introduction,
  // 用户状态
  status: state => state.user.status,
  // 用户角色
  roles: state => state.user.roles,
  // 用户对象信息
  user: state => state.user.user,
  // 我的工单列表
  orders: state => state.order.list,
  // 关于页面信息
  abouts: state => state.about.list,
  // 产品首页滚动图
  banners: state => state.banner.list
}

export default getters