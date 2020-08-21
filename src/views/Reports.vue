<template>
  <v-container class="reports">
    <v-row>
      <v-row class="reports-title">
        <h4
          class="text-h4                                                                                                                                                                                                    "
        >
          {{ type }} reports
        </h4>
        <v-col md="4" sm="12">
          <v-select
            required
            multiple
            persistent-hint
            label="Tags"
            hint="Pick tags for filter"
            prepend-icon="mdi-filter"
            :items="tagList"
            v-model="tags"
          ></v-select>
        </v-col>
      </v-row>
      <transition name="fade">
        <Loader v-if="loading" />
        <v-row v-else-if="reports && reports.list" class="list" align="center" justify="center">
          <Card
            sm="6"
            lg="4"
            v-for="report of reports.list"
            :key="report.id"
            :report="report"
            :type="type"
          />
        </v-row>
        <v-row v-else>
          <h5 class="text-h5">List is empty</h5>
        </v-row>
      </transition>
    </v-row>

    <v-pagination
      v-if="!loading && reports && reports.pages > 1"
      circle
      :length="reports.pages"
      v-model="page"
      :total-visible="7"
    ></v-pagination>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import tagList from '@/assets/tags'
import Card from '@/components/Card'
import Loader from '@/components/Loader'

export default {
  name: 'Reports',
  data: () => ({
    page: 1,
    tagList,
    tags: [],
  }),
  watch: {
    tags() {
      this.page = 1
    },
  },
  components: {
    Card,
    Loader,
  },
  computed: {
    ...mapState(['loading']),
    type() {
      return this.$route.params.type
    },
    reports() {
      return this.$store.getters.getReports(this.type, this.page, this.tags)
    },
    pageCount() {
      return this.$store.getters.pageCount(this.type)
    },
  },
}
</script>
<style lang="scss">
.reports {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-title {
    margin: 20px 0 30px;
  }
  > .row {
    flex: 0;
    flex-direction: column;
  }
  h4 {
    line-height: 5rem;
    text-transform: uppercase;
    margin-right: auto;
  }
  .v-pagination {
    margin-bottom: 3%;
  }
}
@media (max-width: 960px) {
  .reports {
    .text-h4 {
      display: none;
    }
  }
}
</style>
