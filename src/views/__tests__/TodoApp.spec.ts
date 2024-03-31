// src\components\__tests__\TodoApp.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoApp from '@/views/TodoApp.vue'
import TodoItem from '@/components/TodoItem.vue'
import { nextTick } from 'vue'

describe('TodoApp', () => {
  // TODO: remake to only test contained functions and render
  beforeEach(() => {
    localStorage.clear();
  });

  it('add a new todo', async () => {
    const wrapper = mount(TodoApp);

    const input = wrapper.find('input[type="text"]');
    const newTodoText = 'New Todo';
    await input.setValue(newTodoText);
    await input.trigger('keyup.enter');
    
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1);
    expect(wrapper.text()).toContain(newTodoText);
  });

  it('delete a todo', async () => {
    const wrapper = mount(TodoApp);

    const input = wrapper.find('input[type="text"]');
    await input.setValue('Todo to be deleted');
    await input.trigger('keyup.enter');

    await wrapper.findComponent(TodoItem).find('.delete_button').trigger('click');

    expect(await wrapper.findAllComponents(TodoItem)).toHaveLength(0);
  });

  it('mark todo as completed', async () => {
    const wrapper = mount(TodoApp);
    // Add a todo first
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Todo to be changed');
    await input.trigger('keyup.enter');

    const todoItem = wrapper.findComponent(TodoItem);
    await todoItem.get('input[type="checkbox"]').setValue(true);
    await nextTick();
    
    expect(await wrapper.findComponent(TodoItem).vm.todo.completed).toBe(true);
  });

  it('delete all button works', async () => {
    const wrapper = mount(TodoApp);
  
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Todo 1');
    await input.trigger('keyup.enter');
    await input.setValue('Todo 2');
    await input.trigger('keyup.enter');
  
    let todoItems = await wrapper.findAllComponents(TodoItem);
    await todoItems.at(0)!.get('input[type="checkbox"]').setValue(true);
    await nextTick();
  
    await wrapper.find('#delete-completed-btn').trigger('click');
    await nextTick();

    todoItems = await wrapper.findAllComponents(TodoItem);
  
    expect(todoItems.length).toBe(1);
    expect(todoItems.at(0)!.text()).toContain('Todo 2');
  });

  it('local storage works', async () => {
    let wrapper = mount(TodoApp);
  
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Todo 1');
    await input.trigger('keyup.enter');
  
    let todoItems = await wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(1);


    wrapper = mount(TodoApp);
    todoItems = await wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(1);
  });
});