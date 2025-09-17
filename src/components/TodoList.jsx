import React, { useState } from 'react'
import TodoForm from './TodoForm'

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)

  return (
    <ul className="list-group">
      {todos.length === 0 && <li className="list-group-item">No tasks yet</li>}
      {todos.map(t => (
        <li
          key={t.id}
          className="list-group-item d-flex align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center flex-grow-1">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={t.completed}
              onChange={() => onToggle(t.id)}
              aria-label={`Mark ${t.text} complete`}
            />

            {editingId === t.id ? (
              <div className="flex-grow-1">
                <TodoForm
                  initial={t.text}
                  submitLabel="Save"
                  onSubmit={(text) => {
                    onUpdate(t.id, text)
                    setEditingId(null)
                  }}
                />
              </div>
            ) : (
              <span
                style={{ textDecoration: t.completed ? 'line-through' : undefined }}
                className="flex-grow-1"
              >
                {t.text}
              </span>
            )}
          </div>

          <div className="ms-2">
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => setEditingId(editingId === t.id ? null : t.id)}
              aria-label={`Edit ${t.text}`}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(t.id)}
              aria-label={`Delete ${t.text}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
