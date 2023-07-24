<script setup lang="ts">
import { ref } from 'vue';

const todoItems = ref(['Pay electric bill', 'Walk the dog']);
const newItem = ref("");
function submit (event: Event) {
  event.preventDefault();
  todoItems.value.push(newItem.value);
  newItem.value="";
}

function remove(index: number) {
  if(index>=0 && index < todoItems.value.length) { 
    todoItems.value.splice(index, 1);
  }
}
</script>

<template>
  <div>
    <h1>To-Do List</h1>
    <ul class="todo-list">
      <li v-for="(item, index) in todoItems" :key="item">
        {{ item }}
        <button @click="remove(index)">Remove</button> 
      </li>
    </ul>
    <form action="">
      <input v-model="newItem">
      <button @click="submit">Add Item</button>
    </form>
  </div>
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
