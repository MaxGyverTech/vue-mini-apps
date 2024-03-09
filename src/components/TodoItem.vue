<script setup lang="ts">
import { ref } from 'vue'
export interface Todo {
  id: number
  text: string
  completed: boolean
}
defineEmits<{
  changed: [todo: Todo]
  delete: [todo: Todo]
}>()
const props = defineProps<{todo: Todo}>()
const item = ref(props.todo)
const isEditing = ref(false);
</script>

<template>
<li>
  <div>
    <input type="checkbox" v-model="item.completed" @change="$emit('changed', item)">
    <span :class="{ striked: item.completed }" v-if="!isEditing" @dblclick="isEditing=true" >{{ item.text }}</span>
    <input  v-if="isEditing" type="text" v-model="item.text" @blur="isEditing=false"
            @keyup.enter="$emit('changed', item); isEditing=false" > 
    <button v-if="isEditing" @click="isEditing=false">Cancel</button>
    <button class="delete_button" @click="$emit('delete', item)">🗑️</button>
  </div>
</li>


</template>

<style scoped>
.striked {
  text-decoration: line-through;
  color: gray;
}
.delete_button {
  background-color: transparent; 
  border: 0;
}
span, input[type="text"] {width: 100%;}
li > div {
  display: flex;
  align-items: center;
  padding: 6px;
  transition: 0.5s;
  border-bottom: 1px white solid;
}
li:last-of-type > div { border-color: transparent; }
li > div > button { margin-left: auto;}
input[type="checkbox"] {
    min-width: 30px;
    height: 30px;
}
</style>