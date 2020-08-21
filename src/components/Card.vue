<template>
  <v-col md="4">
    <v-card color="#385F73" dark>
      <v-card-title class="headline">{{ report.title }}</v-card-title>
      <v-card-text>{{ report.description }}</v-card-text>
      <v-card-text class="labels">
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
      </v-card-text>
      <v-card-actions>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="toggleReport">
              <v-icon>{{ !isSaved ? 'mdi-plus-circle' : 'mdi-minus-circle' }}</v-icon>
            </v-btn>
          </template>
          <span>{{ !isSaved ? 'Save to' : 'Remove from' }} local reports</span>
        </v-tooltip>
        <v-btn text :to="`/reports/${type}/${report.id}`"><p>view details</p></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { reportCRUDMixin } from '../mixins/reportCRUDMixin'

export default {
  mixins: [reportCRUDMixin],
  props: {
    report: Object,
    type: String,
  },
}
</script>

<style lang="scss">
.v-card {
  &__text {
    display: -webkit-box;
    text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    height: 70px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
  }
  p {
    margin-bottom: 0;
  }
  .labels {
    padding-bottom: 0;
    height: 50px !important;
  }
}
</style>
