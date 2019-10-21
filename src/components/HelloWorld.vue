<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Harvard Art Museum Browser
        </h1>
        <h2 class="headline font-weight-bold mb-3">
          To begin, please select an option from the menu above!
        </h2>
        <p class="subheading font-weight-regular">
          For more info about harvard API, select this
          <a href="https://www.harvardartmuseums.org/collections/api" target="_blank">Link!</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld'
};
</script>
