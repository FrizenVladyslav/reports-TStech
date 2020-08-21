<template>
  <div>
    <v-app-bar color="teal" dark>
      <v-toolbar-title>TStech</v-toolbar-title>
      <v-divider class="mx-4" vertical></v-divider>
      <span class="subheading">Reports</span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/reports/local">Local reports</v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn text to="/reports/api">Api reports</v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn text to="/create">Create Report</v-btn>
        <v-divider inset vertical></v-divider>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
