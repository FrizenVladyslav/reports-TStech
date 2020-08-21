<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import Header from '@/components/Header'
import store from './store'

Vue.use(Toasted, { duration: 5000 })

export default {
  name: 'App',
  store,
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('fetchReports')
  },
}
</script>
