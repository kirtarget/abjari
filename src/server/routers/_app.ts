import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { Item } from "../../lib/types/apiTypes";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { sanClient } from "../../lib/sanityClient";


const itemSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  mainImage: z.string(),
  images: z.array(z.string()),
});

// Подключение к ОРМ
export const prisma = new PrismaClient();

// Создание роутов (Ключ объекта - роут,
//input - то, что получаем на входе, query - функция, выполняемая при гет-запросе,
//mutation - функция, выполняемая при остальных типах запроса)
export const appRouter = router({
  items: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async (): Promise<{ items: Item[] }> => {
      const items = await sanClient.fetch('*[_type == "product"]');

      return { items };
    }),

  // addItem: publicProcedure.input(itemSchema).mutation(async ({ input }) => {
  //   const data: IProduct = {
  //     _id: input.id?.toString() || "",
  //     name: input.name,
  //     description: input.description,
  //     pricegel: input.pricegel,
  //     mainImage: input.mainImage,
  //     image: input.image,
  //   };

  //   await prisma.item.create({ data });

  //   return "succsess";
  // }),

  product: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async (): Promise<{ item: Item } | null> => {
      const item: Item = await sanClient.fetch(
        '*[_type == "product" && _id == ${id}][0]'
      );

      // prisma.item.findUnique({
      //   where: {
      //     id: input.id,
      //   },
      // });

      if (!item) return null;

      return { item };
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
    });
  }),

  sendParcel: publicProcedure
    .input(
      z.object({
        ParcelTypeId: z.number(),
        ReceiverCityId: z.number(),
        ReceiverAddressNote: z.string(),
        ZIP: z.string(),
        IsExpress: z.boolean(),
        deliveryMethod: z.number(),
        Weight: z.number(),
        X: z.number(),
        Y: z.number(),
        Z: z.number(),
        Quantity: z.number(),
        Insurance: z.object({
          IsInsured: z.boolean(),
          InsuranceAmount: z.number(),
          InsuranceCurrencyID: z.number(),
        }),
        ReceiverPerson: z.object({
          PersonTypeId: z.number(),
          FirstName: z.string(),
          LastName: z.string(),
          OrganizationName: z.string(),
          Phone: z.string(),
          Email: z.string(),
        }),
        PaymentMethod: z.number(),
        isHand2Hand: z.boolean(),
        customerParcelCode: z.string(),
        declarationItems: z.array(
          z.object({
            declarationItemID: z.number(),
            comment: z.string(),
            currencyId: z.number(),
            itemCount: z.number(),
            itemPrice: z.number(),
            itemWeigth: z.number(),
          })
        ),
        needExportDeclaration: z.boolean(),
      })
    )
    .mutation(() => {
      var data = JSON.stringify({
        ParcelTypeId: 55,
        ReceiverCityId: 5877,
        ReceiverAddressNote: "ul Karla Marksa, 47-5",
        ZIP: "127001",
        IsExpress: false,
        deliveryMethod: 227,
        Weight: 1.1,
        X: 10,
        Y: 10,
        Z: 10,
        Quantity: 1,
        Insurance: {
          IsInsured: false,
          InsuranceAmount: 2.1,
          InsuranceCurrencyID: 3,
        },
        ReceiverPerson: {
          PersonTypeId: 2,
          FirstName: "Kirill",
          LastName: "Kartashyov",
          OrganizationName: "null",
          Phone: "+375444862986",
          Email: "sheldongriffiths1@gmail.com",
        },
        PaymentMethod: 230,
        isHand2Hand: false,
        customerParcelCode: "dkdc13Kscm",
        declarationItems: [
          {
            declarationItemID: 336342,
            comment: "Test order for testing postal API",
            currencyId: 1,
            itemCount: 1,
            itemPrice: 1,
            itemWeigth: 1.1,
          },
        ],
        needExportDeclaration: false,
      });

      var config = {
        method: "post",
        url: "https://istore.gpost.ge/api/RegisterParcel",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_GEORGIAN_POST_AUTH,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.request);
        })
        .catch(function (error) {
          console.log(error);
        });
    }),

  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) return null;

      return { user };
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
        });

        const data = await res.json();

        const url = await data.response.transactionUrl;

        return url;
      } catch (e) {
        console.log(e);
      }
    }),
});

export type AppRouter = typeof appRouter;
