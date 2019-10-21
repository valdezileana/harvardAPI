<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hello</span>
        <span class="font-weight-light">Welcome to the Harvard Art Museum Browser</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-on:click="getSearch">
        <span class="mr-2">Search</span>
      </v-btn>
      <v-btn v-on:click="getGalleries">
        <span class="mr-2">Galleries</span>
      </v-btn>
      <v-btn v-on:click="displayToDos">
        <span class="mr-2">ToDos!</span>
      </v-btn>
    </v-app-bar>

    <v-content v-if="welcomePage">
      <HelloWorld/>
    </v-content>
    <v-content v-else-if="showGalleries">
      <Galleries v-on:selected="getObjects"/>
    </v-content>
    <v-content v-else-if="showSearch">
      <HelloWorld/>
    </v-content>
    <v-content v-else-if="selectOption">
      <Objects v-bind:selectName="selectOption" v-bind:pageNumber="1" v-on:selected="displayObject"/>
    </v-content>
    <v-content v-else-if="objectJson">
      <Object v-bind:objnumber="objectJson"/>
    </v-content>
    <v-content v-else-if="toDos">
      <ToDos/>
    </v-content>
  </v-app>
</template>

<script>
import Galleries from './components/Galleries';
import HelloWorld from './components/HelloWorld';
import Objects from './components/Objects';
import Object from './components/Object';
import ToDos from './components/ToDo';

export default {
  name: 'App',
  components: {
    Galleries,
    HelloWorld,
    Objects,
    Object,
    ToDos
  },
  props: {
    numberVisits: Number
  },
  methods: {
    getGalleries(){
      this.showGalleries = true,
      this.showSearch = false,
      this.welcomePage = false,
      this.selectOption = null,
      this.objectJson = null
    },
    getSearch(){
      this.showGalleries = false,
      this.showSearch = true,
      this.welcomePage = false,
      this.selectOption = null,
      this.objectJson = null
    },
    getObjects(galName){
      this.showGalleries = false,
      this.showSearch = false,
      this.welcomePage = false,
      this.selectOption = galName,
      this.objectJson = null
    },
    displayObject(objJson){
      this.showGalleries = false,
      this.showSearch = false,
      this.welcomePage = false,
      this.selectOption = null,
      this.objectJson = objJson
    },
    displayToDos(){
      this.showGalleries = false,
      this.showSearch = false,
      this.welcomePage = false,
      this.selectOption = null,
      this.objectJson = null,
      this.toDos = true
    }
  },
  data (){ return {
    showGalleries: false,
    showSearch: false,
    welcomePage: true,
    selectOption: null,
    objectJson: null,
    toDos: false
  }},
};
</script>
