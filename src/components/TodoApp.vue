<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import TodoItem from "@/components/TodoItem.vue";
import { type Todo } from "@/components/TodoItem.vue";

let id=0;
const storage = "vue_todo";
const todos: Ref<Todo[]> = ref(JSON.parse(localStorage.getItem(storage) || '[]'))
watch(todos,() => {localStorage.setItem(storage, JSON.stringify(todos.value))}, {deep: true})
todos.value.forEach(todo => {
  if (todo.id>=id) id = todo.id+1; 
});

const activeTodos = computed(() => todos.value.filter((todo) => !todo.completed))
const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))
const editTipVisible = ref(false)
let firtsTimeFlag = true;
function addTodo(e: Event) {
  let input = (e.target as HTMLInputElement);
  if (input && input.value) {
    todos.value.push({ id: id++, text: input.value, completed: false });
    input.value = '';
    if (firtsTimeFlag && todos.value.length==1) {
      firtsTimeFlag=false;
      setTimeout(()=>editTipVisible.value=true,500)
      setTimeout(()=>editTipVisible.value=false,3000)
    }
  }
}
function changedTodo(todo: Todo) {
  todos.value[todos.value.findIndex((t)=>t.id==todo.id)] = todo
}
function deleteTodo(todo: Todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
<div id="wrapper">
    <h1>Todo app</h1>
    <input type="text" placeholder="Press enter to add" @keyup.enter="addTodo">

    <div>
        <TransitionGroup name="fade" tag="ul">
          <div v-if="activeTodos.length" :key="'active'">Active</div>
          <span v-if="editTipVisible">Double click on todo to edit</span>
          <TodoItem v-for="todo in activeTodos" :key="todo.id"
                    :todo="todo" @delete="deleteTodo" @changed="changedTodo"/>
            
          <div v-if="completedTodos.length" :key="'completed'">Completed</div>
          <TodoItem v-for="todo in completedTodos" :key="todo.id"
                    :todo="todo" @delete="deleteTodo" @changed="changedTodo"/>
          
          <button @click="todos = activeTodos" v-if="todos.length > 0 && completedTodos.length > 0" 
                  :key="'deletebtn'">Delete completed</button>
        </TransitionGroup>
      </div>
      <Transition name="fade">
      </Transition>
</div>
</template>


<style scoped>
#wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
}
input[type="text"] {
    padding: 4px;
    font-size: 24px;
    width: 100%;
}
ul > div, button {margin-top: 20px;}
ul > span {color: gray;}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-active {
  position: absolute;
}
</style>