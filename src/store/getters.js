import localforage from 'localforage'

const getters = {
  token: state => state.user.token,
  curProd: () => {
    return localforage.getItem('curProd')
  },
  applyInfo: state => {
    return localforage.getItem('apply_info')
  },
  personalInfo: state => {
    return localforage.getItem('personal_info')
  },
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