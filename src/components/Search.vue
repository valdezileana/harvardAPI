//inspo link https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
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
          Welcome to the Search Page!
        </h1>
        <h2 class="headline font-weight-bold mb-3">
          To search, fill in a bar for the type of search you want to conduct and press enter to see results!
        </h2>
        <p class="subheading font-weight-regular">
          Note: Fields are not required so feel free to fill in only the ones important to you!
        </p>
      </v-flex>
    </v-layout>
    <h2 class="headline font-weight-bold mb-3">
          Fill in the form below to search through Objects!
    </h2>
    <v-flex mb-4 >
      <v-text-field label="Person" v-model="objPerson" @keydown.enter="addTodo" outlined></v-text-field>
      <v-text-field label="Culture" v-model="objCulture" @keydown.enter="addTodo" outlined></v-text-field>
      <v-text-field label="Keyword" v-model="objKeyword" @keydown.enter="addTodo" outlined></v-text-field>
      <v-text-field label="Place" v-model="objPlace" @keydown.enter="addTodo" outlined></v-text-field>
      <v-text-field label="Period" v-model="objPeriod" @keydown.enter="addTodo" outlined></v-text-field>
    </v-flex>
    <h2 class="headline font-weight-bold mb-3">
          Fill in the form below to search through Exhibits!
    </h2>
    <v-flex mb-4 >
      <v-text-field label="Has Image" v-model="exHasImage" @keydown.enter="addExhibitionTodo" outlined></v-text-field>
      <v-text-field label="Venue" v-model="exVenue" @keydown.enter="addExhibitionTodo" outlined></v-text-field>
      <v-text-field label="Status" v-model="exStatus" @keydown.enter="addExhibitionTodo" outlined></v-text-field>
      <v-text-field label="Before" v-model="exBefore" @keydown.enter="addExhibitionTodo" outlined></v-text-field>
      <v-text-field label="After" v-model="exAfter" @keydown.enter="addExhibitionTodo" outlined></v-text-field>
    </v-flex>

    <h2 class="headline font-weight-bold mb-3">
          Fill in the form below to search through Place!
    </h2>
    <v-flex mb-4 >
      <v-text-field label="Size" v-model="placeSize" @keydown.enter="addPlaceTodo" outlined></v-text-field>
      <v-text-field label="Page" v-model="placePage" @keydown.enter="addPlaceTodo" outlined></v-text-field>
      <v-text-field label="Used By" v-model="placeUsed" @keydown.enter="addPlaceTodo" outlined></v-text-field>
      <v-text-field label="Level" v-model="placeLevel" @keydown.enter="addPlaceTodo" outlined></v-text-field>
      <v-text-field label="Parent" v-model="placeParent" @keydown.enter="addPlaceTodo" outlined></v-text-field>
    </v-flex>

    <h2 class="headline font-weight-bold mb-3">
          Fill in the form below to search through Groups!
    </h2>
    <v-flex mb-4 >
      <v-text-field label="Size" v-model="groupSize" @keydown.enter="addGroupTodo" outlined></v-text-field>
      <v-text-field label="Page" v-model="groupPage" @keydown.enter="addGroupTodo" outlined></v-text-field>
      <v-text-field label="Used By" v-model="groupUsed" @keydown.enter="addGroupTodo" outlined></v-text-field>
      <v-text-field label="Level" v-model="groupLevel" @keydown.enter="addGroupTodo" outlined></v-text-field>
      <v-text-field label="Parent" v-model="groupParent" @keydown.enter="addGroupTodo" outlined></v-text-field>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {return {
    groupSize: '',
    groupPage: '',
    groupUsed: '',
    groupLevel: '',
    groupParent: '',
    placeSize: '',
    placePage: '',
    placeUsed: '',
    placeLevel: '',
    placeParent: '',
    objPerson: '',
    objCulture: '',
    objKeyword: '',
    objPlace: '',
    objPeriod: '',
    exHasImage: '',
    exVenue: '',
    exStatus: '',
    exBefore: '',
    exAfter: '',
  }},
  methods: {
    addTodo() {
      let search = '/vue/API?api=object&size=100&person=' + this.objPerson + '&culture=' + this.objCulture + '&keyword=' + this.objKeyword +
      '&place=' + this.objPlace + '&period=' + this.objPeriod;
      this.fetchSearchResults(search);
    },
    addExhibitionTodo() {
      let search = '/vue/API?api=exhibition&size=100&hasimage=' + this.exHasImage + '&venue=' + this.exVenue + '&status=' + this.exStatus +
      '&before=' + this.exBefore + '&after=' + this.exAfter;
      this.fetchSearchResults(search);
    },
    addPlaceTodo() {
      let search = '/vue/API?api=place&size=100&size=' + this.placeSize + '&page=' + this.placePage + '&usedby=' + this.placeUsed +
      '&level=' + this.placeLevel + '&parent=' + this.placeParent;
      this.fetchSearchResults(search);
    },
    addGroupTodo() {
      let search = '/vue/API?api=group&size=100&size=' + this.groupSize + '&page=' + this.groupPage + '&usedby=' + this.groupUsed +
      '&level=' + this.groupLevel + '&parent=' + this.groupParent;
      this.fetchSearchResults(search);
    },
    fetchSearchResults(url){
          this.$emit("selected", url)
    },
  },
};

</script>

