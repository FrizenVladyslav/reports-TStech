<template>
  <v-row class="header" align="center" justify="center">
    <v-col xs="10" md="6" lg="4">
      <v-form class="form" ref="form" v-model="isValid">
        <v-text-field
          required
          label="Title"
          maxLength="100"
          :counter="100"
          :rules="titleRules"
          v-model="title"
        ></v-text-field>
        <v-select
          required
          multiple
          persistent-hint
          label="Tags"
          hint="Pick tags for this report"
          :rules="tagsRules"
          :items="tagList"
          v-model="tags"
        ></v-select>
        <v-textarea
          required
          label="Description"
          :counter="500"
          :rules="descriptionRules"
          v-model="description"
        ></v-textarea>
        <v-btn color="success" class="mr-4" :disabled="!isValid" @click="submit">
          Create report
        </v-btn>
        <v-btn color="error" class="mr-4" :disabled="!isEmpty" @click="reset">
          Clear form
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import tagList from '@/assets/tags'
import _ from 'lodash'

export default {
  data: () => ({
    isValid: true,
    title: '',
    description: '',
    tags: [],
    titleRules: [v => !!v.trim() || 'Title is required'],
    descriptionRules: [v => !!v.trim() || 'Description is required'],
    tagsRules: [v => !!v.length || 'Pick min 1 tag'],
    tagList,
  }),
  computed: {
    isEmpty() {
      return !!this.title || !!this.description || !!this.tags.length
    },
  },
  methods: {
    ...mapActions(['addReport']),
    reset() {
      this.$refs.form.reset()
    },
    submit() {
      this.addReport({ id: Date.now(), ..._.pick(this, ['title', 'description', 'tags']) })
      this.$router.push('/reports/local')
    },
  },
}
</script>

<style scoped>
.header {
  height: 100%;
}
.form {
  height: min-content;
  margin: 10px auto;
  padding: 3em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), -23px 0 20px -23px rgba(0, 0, 0, 0.8),
    23px 0 20px -23px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
@media (max-width: 400px) {
  .form {
    padding: 16px 23px;
  }
}
</style>
