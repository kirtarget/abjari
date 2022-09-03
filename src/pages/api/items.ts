import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = {
    name: req.body.name,
    price: 22.22,
    mainImageUrl: "",
    images: ["j"],
    description: "",
  }

  await prisma.item.create({ data })

  res.status(200)
}
