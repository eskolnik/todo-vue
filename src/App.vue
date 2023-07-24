<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';

type TodoItem = {
  content: string,
  completed: boolean
}

// App State
const todoItems: Ref<TodoItem[]> = ref([
  { content: 'Pay electric bill', completed: false },
  { content: 'Walk the dog', completed: false } 
]);
const newItem: Ref<string> = ref("");
const viewAllTasks: Ref<boolean> = ref(true);

function viewAll() {
  viewAllTasks.value = true;
}

function viewActive() {
  viewAllTasks.value = false;
}

function addItem(event: Event) {
  event.preventDefault();
  if(newItem.value.length <= 0) {
    return;
  }
  todoItems.value.push({ content: newItem.value, completed: false});
  newItem.value="";
}

function completeItemToggle(index: number) {
  if(index>=0 && index < todoItems.value.length) { 
    const todoItem = todoItems.value[index];
    todoItem.completed = !todoItem.completed;
  }
}

function clearItem(index: number) {
  if(index>=0 && index < todoItems.value.length) { 
    const todoItem = todoItems.value[index];
    if(todoItem.completed) {
      todoItems.value.splice(index, 1);
    }
  }
}

function clearAllCompleted() {
  todoItems.value = todoItems.value.filter(item => !item.completed);
}

const visibleTodoItems = computed(() => viewAllTasks.value ? todoItems.value : todoItems.value.filter(item => !item.completed));

</script>

<template>
  <div class="todo-app">
    <div class="header">
      <h1>To-Do List</h1>
      <div class="controls">
        <button @click="viewAll" class="view-control" :class="{'view-control-active': viewAllTasks}">All</button>
        <button @click="viewActive" class="view-control" :class="{'view-control-active': !viewAllTasks}">Active</button>
        <button @click="clearAllCompleted" class="clear-all-completed" :disabled="todoItems.every(item => !item.completed)">
          Clear Completed
        </button>
      </div>
    </div>
    <ul class="todo-list">
      <li v-for="(item, index) in visibleTodoItems" 
          :key="item.content" :class="['todo-item', {'todo-item-completed': item.completed}]">
        <span class="todo-item-content">{{ item.content }}</span>
        <div>
          <span v-if="item.completed" @click="clearItem(index)" class="todo-item-clear-button">
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </span>
          <input @click="completeItemToggle(index)"  type="checkbox" class="todo-item-complete-checkbox">
        </div>
      </li>
    </ul>
    <form action="" class="add-item">
      <input v-model="newItem" class="add-item-input" data-test="new-todo">
      <button @click="addItem" class="add-item-submit">Add Item</button>
    </form>
  </div>
</template>

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
.todo-item {
  list-style: none;
  padding: 10px;
  margin: 10px;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
.todo-item-complete-checkbox {
    margin-left: 16px;
  }
.todo-item-completed {
  text-decoration: line-through;
  order: 1;
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