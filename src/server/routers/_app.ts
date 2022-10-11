import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { router, publicProcedure } from "../trpc"
import { Item } from "../../lib/types/apiTypes"
import { initTRPC } from "@trpc/server"

const prisma = new PrismaClient()
export const t = initTRPC.create()

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      }
    }),
  items: publicProcedure
    .input(z.object({ text: z.string().nullish() }))
    .query(async () => {
      try {
        const items = await prisma.item.findMany()
        return { items }
      } catch (error) {
        throw new Error()
      }
    }),
  addItem: t.procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        mainImage: z.string(),
        images: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const data: Item = {
          name: input.name,
          description: input.description,
          price: input.price,
          mainImage: input.mainImage,
          images: input.images,
        }

        await prisma.item.create({ data })

        return "succsess"
      } catch (e) {
        return
      }
    }),
})

export type AppRouter = typeof appRouter
