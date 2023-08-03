<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import TodoListItem from './components/TodoListItem.vue'

// App State
const todoItems: Ref<TodoItem[]> = ref([])
const newItem: Ref<string> = ref('')
const viewAllTasks: Ref<boolean> = ref(true)

const LOCALSTORAGE_KEY_PREFIX = 'TODO-LIST-VUE:'
function localStorageKey(key: string): string {
  return LOCALSTORAGE_KEY_PREFIX + key
}

// save state to localStorate
function persist() {
  localStorage.setItem(localStorageKey('TodoItems'), JSON.stringify(todoItems.value))
}

function hydrate() {
  const localItems = localStorage.getItem(localStorageKey('TodoItems'))

  if (localItems) {
    todoItems.value = JSON.parse(localItems)
  } else {
    //use default initial state
    todoItems.value = [
      { content: 'Pay electric bill', completed: false },
      { content: 'Walk the dog', completed: false }
    ]
  }
}

// fetch state from localStorage on component mount
onMounted(hydrate)

function viewAll() {
  viewAllTasks.value = true
}

function viewActive() {
  viewAllTasks.value = false
}

function addItem(event: Event) {
  event.preventDefault()
  if (newItem.value.length <= 0) {
    return
  }
  todoItems.value.push({ content: newItem.value, completed: false })
  newItem.value = ''
  persist()
}

function completeItemToggle(index: number) {
  if (index >= 0 && index < todoItems.value.length) {
    const todoItem = todoItems.value[index]
    todoItem.completed = !todoItem.completed
  }
  console.log(todoItems.value)
  persist()
}

function clearItem(index: number) {
  if (index >= 0 && index < todoItems.value.length) {
    const todoItem = todoItems.value[index]
    if (todoItem.completed) {
      todoItems.value.splice(index, 1)
    }
  }
  persist()
}

function clearAllCompleted() {
  todoItems.value = todoItems.value.filter((item) => !item.completed)
  persist()
}
</script>

<template>
  <div class="todo-app">
    <div class="header">
      <h1>To-Do List</h1>
      <div class="controls">
        <button
          @click="viewAll"
          class="view-control"
          :class="{ 'view-control-active': viewAllTasks }"
        >
          All
        </button>
        <button
          @click="viewActive"
          class="view-control"
          :class="{ 'view-control-active': !viewAllTasks }"
        >
          Active
        </button>
        <button
          @click="clearAllCompleted"
          class="clear-all-completed"
          :disabled="todoItems.every((item) => !item.completed)"
        >
          Clear Completed
        </button>
      </div>
    </div>
    <ul class="todo-list" :class="{ 'hide-completed': !viewAllTasks }">
      <TodoListItem
        v-for="(item, index) in todoItems"
        :key="item.content"
        @clear-item="clearItem"
        @complete-item-toggle="completeItemToggle"
        :item="item"
        :index="index"
        :viewAll="viewAllTasks"
      />
    </ul>
    <form action="" class="add-item">
      <input v-model="newItem" class="add-item-input" data-test="new-todo" />
      <button @click="addItem" class="add-item-submit">Add Item</button>
    </form>
  </div>
</template>

<style>
.hide-completed > .todo-item-completed {
  display: none;
}
</style>

<style scoped>
.todo-app {
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
h1 {
  margin-bottom: 20px;
}
.controls {
  width: 50%;
  display: flex;
  justify-content: center;
}
.view-control {
  margin: 10px;
  width: 80px;
  height: 40px;
}
.view-control-active {
  text-decoration: underline;
}
.clear-all-completed {
  margin: 10px 10px 10px 80px;
  height: 40px;
}
.todo-list {
  width: 50%;
  margin-left: 0px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
}
.add-item {
  width: 80%;
  display: flex;
  justify-content: space-around;
}
.add-item-input {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 10px;
  box-sizing: border-box;
  outline: none;
}
.add-item-submit {
  margin: 10px;
  width: 100px;
}
</style>
