import React from "react"
import AddItemForm from "../../components/Forms/AddItemForm"
import ItemsLoader from "./ItemsLoader"
import Layout from "../../components/UI/Layout"

interface Item {
  id?: any
  name: string
  price: number
  mainImage: string
  images: string[]
  description: string
}

export default function AdminPage(): JSX.Element {
  return (
    <div className="mx-4">
      <h1>Админ-панель</h1>

      <h2>Добавление товара:</h2>
      <AddItemForm />

      <h2>Список товаров:</h2>
      <ItemsLoader />
    </div>
  )
}
