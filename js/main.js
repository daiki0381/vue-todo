'use strict';

const app = new Vue({
  el: '#app',
  data() {
    return {
      newItem: '',
      todos: [],
    };
  },
  created() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) this.todos = todos;
  },
  methods: {
    addTodo() {
      if (!this.newItem) return;
      const todo = {
        id: new Date().getTime().toString(),
        item: this.newItem,
        isDone: false,
        isEdit: false,
      };
      this.todos.push(todo);
      this.newItem = '';
      this.saveTodos();
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    editTodo(index, id, item, isDone) {
      this.todos.splice(index, 1, {
        id: id,
        item: item,
        isDone: isDone,
        isEdit: true,
      });
      this.saveTodos();
    },
    updateTodo(index, id, item, isDone) {
      this.todos.splice(index, 1, {
        id: id,
        item: item,
        isDone: isDone,
        isEdit: false,
      });
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
  },
});
