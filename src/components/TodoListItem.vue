<script setup lang="ts">
defineProps<{
  item: TodoItem
  index: number
}>()
</script>

<template>
  <li :class="['todo-item', { 'todo-item-completed': item.completed }]">
    <span class="todo-item-content">{{ item.content }}</span>
    <div>
      <span v-if="item.completed" @click="$emit('clearItem', index)" class="todo-item-clear-button">
        <font-awesome-icon :icon="['far', 'trash-can']" />
      </span>
      <input
        @click="$emit('completeItemToggle', index)"
        type="checkbox"
        class="todo-item-complete-checkbox"
        :checked="item.completed"
      />
    </div>
  </li>
</template>

<style scoped>
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
</style>
