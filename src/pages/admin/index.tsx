import React, { ReactNode, useRef } from "react"

export default function AddItem(): ReactNode {
  const nameRef = useRef<HTMLInputElement>(null)

  const onAddItemHandler = async (e: any) => {
    const data = { name: nameRef.current?.value }
    const result = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="flex gap-4">
      <form onSubmit={onAddItemHandler} className="flex flex-col p-2 gap-2">
        <label htmlFor="name">Название модели</label>
        <input ref={nameRef} id="name" placeholder="name" />
        <button className="border-2 border-gray-800 rounded 2xl" type="submit">
          Отправить
        </button>
      </form>
    </div>
  )
}
