import Vue from 'vue'
import Vuex from 'vuex'

import { hasDuplicates } from '../utils/arrays'
import { api } from '../config'

Vue.use(Vuex)

const endpoint = '/reports'

const pageSize = 5

export default new Vuex.Store({
  state: {
    loading: false,
    localReports: [],
    apiReports: [],
  },
  mutations: {
    setApiReports(state, reports) {
      state.apiReports = reports
    },
    setLocalReports(state, reports) {
      state.localReports = reports
    },
    setSavedReportsIds(state, ids) {
      state.savedReportIds = ids
    },
    setLoading(state, loading = !loading) {
      state.loading = loading
    },
  },
  actions: {
    async fetchReports(context) {
      context.commit('setLoading', true)
      try {
        const localReports = JSON.parse(localStorage.getItem('reports') || '[]')
        context.commit('setLocalReports', localReports)

        const { data: apiReports } = await api.get(endpoint)
        context.commit('setApiReports', apiReports)
      } catch (e) {
        Vue.toasted.error('Error received reports')
        console.error('Error received reports', e)
      } finally {
        context.commit('setLoading', false)
      }
    },
    addReport(context, report) {
      const newReports = [...context.state.localReports, report]
      localStorage.setItem('reports', JSON.stringify(newReports))

      Vue.toasted.success('Report successfuly added')

      context.commit('setLocalReports', newReports)
    },
    removeReport(context, id) {
      const newReports = context.state.localReports.filter(report => report.id !== id)
      localStorage.setItem('reports', JSON.stringify(newReports))

      Vue.toasted.show('Report successfuly deleted')

      context.commit('setLocalReports', newReports)
    },
  },
  getters: {
    getReports: state => (type = 'api', page = 1, tags) => {
      let reports = state[`${type}Reports`]
      if (!reports || !reports.length) return

      if (tags && tags.length) {
        reports = reports.filter(report => hasDuplicates([...report.tags, ...tags]))
      }

      return {
        list: reports.slice((page - 1) * pageSize, page * pageSize),
        pages: Math.ceil(reports.length / pageSize),
      }
    },
    getReport: state => (id, type = 'api') => {
      const reports = state[`${type}Reports`]
      return reports.find(report => report.id === +id)
    },
    pageCount: state => (type = 'api') => {
      const reports = state[`${type}Reports`]
      return Math.ceil(reports.length / pageSize)
    },
    localReportsIds(state) {
      return state.localReports.map(({ id }) => id)
    },
  },
})
