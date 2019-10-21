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
          Welcome to the ToDos Page!
        </h1>
        <h2 class="headline font-weight-bold mb-3">
          Keep track of topics you want to research by adding them to your todos! These are stored across sessions, so don't be afraid to lose your work!
        </h2>
        <p class="subheading font-weight-regular">
          For more info about harvard API, select this
          <a href="https://www.harvardartmuseums.org/collections/api" target="_blank">Link!</a>
        </p>
      </v-flex>
    </v-layout>
    
    <v-flex mb-4 >
      <v-text-field label="Add your todo here" v-model="newTodo" @keydown.enter="addTodo" outlined></v-text-field>
        <ul class="list-unstyled">
        <li v-for="(todo) in todos" v-bind:key="todo" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed">
            {{ todo.text }}
        </li>
        </ul>
        </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {return {
    newTodo: '',
    todos: [],
  }},
  methods: {
    addTodo() {
      this.todos.push({ text: this.newTodo, completed: false });
      this.newTodo = '';
    },
  },
  mounted() {
    if (localStorage.getItem('todos')) this.todos = JSON.parse(localStorage.getItem('todos'));
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true,
    },
  },
};

</script>
