import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'
import { type Todo } from "@/modules/types";

const todo: Todo = { id: 1, text: 'Test Todo', completed: false };
describe('TodoItem', () => {
  it('renders todo text', () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    });
    expect(wrapper.text()).toContain('Test Todo');
    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(false);
  });

  it('emits changed event when checkbox is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    });

    await wrapper.find('input[type="checkbox"]').setValue(true);
    expect(wrapper.emitted('changed')).toBeTruthy();
    expect(wrapper.emitted('changed')![0]).toEqual([{
      ...todo,
      completed: true
    }]);
  });

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    });

    await wrapper.find('.delete_button').trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')![0]).toEqual([todo]);
  });

  it('allows editing the todo text', async () => {
    const todo: Todo = { id: 1, text: 'Original Todo', completed: false };
    const wrapper = mount(TodoItem, {
      props: { todo }
    });

    await wrapper.find('span').trigger('dblclick');
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);

    const newText = 'Updated Todo';
    await input.setValue(newText);
    await input.trigger('keyup.enter');

    expect(wrapper.emitted('changed')).toBeTruthy();
    expect(wrapper.emitted('changed')![0]).toEqual([{ ...todo, text: newText }]);

    expect(wrapper.find('input[type="text"]').exists()).toBe(false);
  });
});