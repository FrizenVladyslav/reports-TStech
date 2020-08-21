import { mapActions } from 'vuex'

export const reportCRUDMixin = {
  computed: {
    isSaved() {
      return this.$store.getters.localReportsIds.includes(this.report.id)
    },
  },
  methods: {
    ...mapActions(['addReport', 'removeReport']),
    toggleReport() {
      !this.isSaved ? this.addReport(this.report) : this.removeReport(this.report.id)
    },
  },
}
