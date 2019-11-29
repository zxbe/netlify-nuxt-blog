export const state = () => ({
  blogPosts: [],
  currentPost: null
})

export const getters = {
  sortNewPosts(state) {
    const newArr = Array.from(state.blogPosts)
    return newArr.sort((a, b) => {
      const [aT, bT] = [a.date, b.date]
      return aT < bT ? 1 : -1
    })
  },
  getCurrentPost(state) {
    return state.currentPost
  }
}

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setCurrentPost(state, post) {
    if (state.currentPost !== null) state.currentPost = null
    state.currentPost = post
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    let files = await require.context('@@/posts', false, /\.json$/)
    let blogPosts = files.keys().map(key => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setBlogPosts', blogPosts)
  }
}
