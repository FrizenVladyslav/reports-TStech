<template>
  <v-container class="report">
    <v-row justify="center">
      <v-col md="10">
        <v-row>
          <h2 class="text-h2 report-title">{{ report.title }}</h2>
        </v-row>
        <v-row>
          <v-divider class="mx-4"></v-divider>
          <p class="font-weight-medium report-text">{{ report.description }}</p>
        </v-row>
        <v-row align="center">
          <v-col sm="6">
            <v-row>
              <v-col sm="12"> <h4 class="text-h4">Tags:</h4></v-col>
              <v-col sm="12">
                <v-chip
                  class="mr-2"
                  color="pink"
                  label
                  text-color="white"
                  v-for="tag of report.tags"
                  :key="tag"
                >
                  {{ tag }}
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6" class="report-buttons">
            <v-btn color="blue-grey" class="ma-2 white--text" @click="toggleReport">
              {{ !isSaved ? 'Save to' : 'Delete from' }} local
              <v-icon right dark>{{ !isSaved ? 'mdi-plus-circle' : 'mdi-minus-circle' }}</v-icon>
            </v-btn>
            <v-btn @click="goBack">Go back<v-icon dark right>mdi-arrow-back</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { reportCRUDMixin } from '../mixins/reportCRUDMixin'

export default {
  mixins: [reportCRUDMixin],
  mounted() {},
  computed: {
    params() {
      return this.$route.params
    },
    report() {
      const { id, type } = this.params
      return this.$store.getters.getReport(id, type)
    },
  },
  methods: {
    toggleReport() {
      if (this.isSaved) {
        this.removeReport(this.report.id)
        if (this.params.type === 'local') {
          this.$router.push('/reports/local')
        }
      } else this.addReport(this.report)
    },
    goBack() {
      return this.$router.back()
    },
  },
}
</script>
<style lang="scss">
.report {
  &-title,
  &-text {
    max-width: 100%;
    word-break: break-all;
  }
  &-buttons {
    justify-content: flex-end;
    align-items: center;
    display: flex;
    > button {
      margin-left: 20px;
    }
  }
  hr {
    margin: 15px auto 30px;
  }
}
</style>
