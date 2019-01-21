import { getBanners } from '@/api/banner'

const banner = {
    state: {
        list: []
    },

    mutations: {
        GET_BANNERS: (state, abouts) => {
            state.list = abouts
        }
    },

    actions: {
        GetBanners: ({ commit }) => {
            return new Promise((resolve, reject) => {
                getBanners().then(response => {
                    const data = response.data
                    commit('GET_BANNERS', data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default banner
