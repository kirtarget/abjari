import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
import { prisma } from "../../server/routers/_app"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

interface Item {
  id?: any
  name: string
  price: number
  mainImage: string
  images: string[]
  description: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Добавление предмета
  if (req.method === "POST") {
    try {
      const item: Item = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        mainImage: req.body.mainImage,
        images: ["sjsj", "hdhd"],
      }

      await prisma.item.create({ data: item })

      return res.status(200)
    } catch (e) {
      res.status(420).send(e)
    }
  }

  // Получение всех предметов
  if (req.method === "GET") {
    try {
      const items: Item[] = await prisma.item.findMany()
      res.json(items)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
