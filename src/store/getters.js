import localforage from 'localforage'

const getters = {
  token: state => state.user.token,
  product: state => state.product.product,
  applyInfo: () => {
    return localforage.getItem('cur_apply_info')
  },
  personalInfo: state => state.product.personalInfo,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  user: state => state.user.user,
  orders: state => state.order.list,
  abouts: state => state.about.list,
  banners: state => state.banner.list
}

export default getters