import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { router, publicProcedure } from "../trpc"
import { Item } from "../../lib/types/apiTypes"
import { initTRPC } from "@trpc/server"

const itemSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  mainImage: z.string(),
  images: z.array(z.string()),
})

// Подключение к ОРМ
export const prisma = new PrismaClient()

// Создание роутов (Ключ объекта - роут,
//input - то, что получаем на входе, query - функция, выполняемая при гет-запросе,
//mutation - функция, выполняемая при остальных типах запроса)
export const appRouter = router({
  items: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async (): Promise<{ items: Item[] }> => {
      const items = await prisma.item.findMany()

      return { items }
    }),

  addItem: publicProcedure.input(itemSchema).mutation(async ({ input }) => {
    const data: Item = {
      name: input.name,
      description: input.description,
      price: input.price,
      mainImage: input.mainImage,
      images: input.images,
    }

    await prisma.item.create({ data })

    return "succsess"
  }),

  product: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }): Promise<{ item: Item } | null> => {
      const item = await prisma.item.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!item) return null

      return { item }
    }),

  editItem: publicProcedure.input(itemSchema).mutation(async ({ input }) => {
    await prisma.item.update({
      where: { id: input.id },

      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        mainImage: input.mainImage,
        images: input.images,
      },
    })
  }),
})

export type AppRouter = typeof appRouter
