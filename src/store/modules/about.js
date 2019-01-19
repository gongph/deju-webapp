import { getAbouts } from '@/api/about'

const about = {
    state: {
        list: []
    },

    mutations: {
        GET_ABOUTS: (state, abouts) => {
            state.list = abouts
        }
    },

    actions: {
        GetAbouts: ({ commit }) => {
            return new Promise((resolve, reject) => {
                getAbouts().then(response => {
                    const data = response.data
                    commit('GET_ABOUTS', data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default about
