import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  ngOnInit(): void {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos = JSON.parse(saved);
    }
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: this.newTodo.trim(),
        completed: false
      };
      this.todos.push(todo);
      this.updateLocalStorage();
      this.newTodo = '';
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.updateLocalStorage();
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
