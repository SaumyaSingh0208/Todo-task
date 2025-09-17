import React from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function generateId() {
  return (window.crypto?.randomUUID?.()) || `${Date.now()}-${Math.random().toString(36).slice(2,9)}`
}

const STORAGE_KEY = "todos_v1"

export default function App() {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, [])

  function addTodo(text) {
    const newTodo = { id: generateId(), text, completed: false, createdAt: Date.now() }
    setTodos([newTodo, ...todos])
  }

  function updateTodo(id, patch) {
    setTodos(todos.map(t => t.id === id ? { ...t, ...patch } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="container py-4">
      <h1 className="mb-3">To-Do</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onToggle={(id) => {
          const todo = todos.find(t => t.id === id)
          if (todo) updateTodo(id, { completed: !todo.completed })
        }}
        onUpdate={(id, text) => updateTodo(id, { text })}
        onDelete={(id) => deleteTodo(id)}
      />
    </div>
  )
}
