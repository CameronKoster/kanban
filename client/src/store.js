import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 30000,
  withCredentials: true
})

//boardid needs to be key


function dictionary(lists) {
  let listDictionary = {}
  for (let i = 0; i < lists.length; i++) {
    let boardId = lists[i].boardId
    if (!listDictionary[boardId]) {
      listDictionary[boardId] = [lists[i]]
    } else {
      listDictionary[boardId].push(lists[i])
    }
  }
  return listDictionary
}
function tDictionary(tasks) {
  let taskDictionary = {}
  debugger
  for (let i = 0; i < tasks.length; i++) {
    let listId = tasks[i].listId
    if (!taskDictionary[listId]) {
      taskDictionary[listId] = [tasks[i]]
    } else {
      taskDictionary[listId].push(tasks[i])
    }
  }
  return taskDictionary
}

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: {},
    tasks: {}

  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = dictionary(lists)
      console.log(state.lists)
    },
    setTasks(state, tasks) {
      // state.tasks = tDictionary(tasks)
      Vue.set(state, 'tasks', tDictionary(tasks))
      console.log(state.tasks)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser')
        })
      router.push({ name: 'login' })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    //LISTS
    getLists({ commit, dispatch }) {
      api.get('lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists', listData)
        .then(serverLists => {
          dispatch('getLists')
        })
    },
    deleteList({ commit, dispatch }, listId) {
      api.delete('lists/' + listId)
        .then(res => {
          dispatch('getLists')
        })
    },
    switchPage({ commit }, listId) {
      router.push({ name: 'List' })
    },
    //Tasks
    getTasks({ commit, dispatch }) {
      api.get('tasks')
        .then(res => {
          commit('setTasks', res.data)
        })
    },
    addTask({ commit, dispatch }, taskData) {
      api.post('tasks', taskData)
        .then(serverTasks => {
          dispatch('getTasks')
        })
    },
    deleteTask({ commit, dispatch }, taskId) {
      api.delete('tasks/' + taskId)
        .then(res => {
          dispatch('getTasks')
        })
    },
    //Comments
    // getComments({ commit, dispatch }) {
    //   api.get('comments')
    //     .then(res => {
    //       commit('setComments', res.data)
    //     })
    // },
    addComment({ commit, dispatch }, commentData) {
      api.post('tasks/' + commentData.taskId + '/comments', commentData.data)
        .then(serverComments => {
          dispatch('getTasks')
        })
    },
    deleteComment({ commit, dispatch }, taskId) {
      api.delete('comments/' + taskId)
        .then(res => {
          dispatch('getTasks')
        })
    },
  }
})