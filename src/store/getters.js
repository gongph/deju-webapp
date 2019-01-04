const getters = {
  token: state => state.user.token,
  product: state => state.product.curProd,
  applyInfo: state => state.product.applyInfo,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  user: state => state.user.user
}

export default getters