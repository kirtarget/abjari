import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { Item } from "../../lib/types/apiTypes"
import { PrismaClient } from "@prisma/client"
import axios from "axios"

const sdk = require("api")("@payze/v1.0#ziql2k8p1d1")

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

  pay: publicProcedure
    .input(
      z.object({
        data: z.object({
          amount: z.number(),
          currency: z.string(),
          lang: z.string(),
          info: z.object({
            description: z.string(),
            image: z.string(),
            name: z.string(),
          }),
        }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const res = await fetch("https://payze.io/api/v1", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "justPay",
            apiKey: process.env.NEXT_PUBLIC_PAYZY_API_KEY,
            apiSecret: process.env.NEXT_PUBLIC_PAYZY_API_SECRET,
            data: {
              amount: input.data.amount,
              currency: input.data.currency || "USD",
              callback: "https://abjari.vercel.app/",
              callbackError: "https://abjari.vercel.app/cart",
              preauthorize: false,
              lang: input.data.lang || "GEL",
              hookUrl: "https://corp.com/payze_hook?authorization_token=token",
              hookRefund: false,
            },
          }),
        })

        const data = await res.json()

        const url = await data.response.transactionUrl

        return url
      } catch (e) {
        console.log(e)
      }
    }),
})

export type AppRouter = typeof appRouter
