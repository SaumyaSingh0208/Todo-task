import React, { useEffect, useRef, useState } from 'react'

export default function TodoForm({ initial = '', submitLabel = 'Add', onSubmit }) {
  const [text, setText] = useState(initial)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo"
          className="form-control"
        />
        <button className="btn btn-primary" type="submit" aria-label={submitLabel}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
