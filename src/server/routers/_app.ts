import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { Item } from '../../lib/types/apiTypes'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { sanClient } from '../../lib/sanityClient'
import { inputAdornmentClasses } from '@mui/material'

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
            const items = await sanClient.fetch('*[_type == "product"]')

            return { items }
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
            )

            // prisma.item.findUnique({
            //   where: {
            //     id: input.id,
            //   },
            // });

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

    sendParcel: publicProcedure
        .input(
            z.object({
                ParcelTypeId: z.number(),
                ReceiverCityId: z.number(),
                ReceiverAddressNote: z.string(),
                ZIP: z.string(),
                IsExpress: z.boolean(),

                Weight: z.number(),

                ReceiverPerson: z.object({
                    FirstName: z.string(),
                    LastName: z.string(),

                    Phone: z.string(),
                    Email: z.string(),
                }),

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
            })
        )
        .mutation(({ input }) => {
            var data = JSON.stringify({
                ParcelTypeId: input.ParcelTypeId, //done
                ReceiverCityId: input.ReceiverCityId, //done
                ReceiverAddressNote: input.ReceiverAddressNote, //done
                ZIP: input.ZIP, //done
                IsExpress: input.IsExpress, // done
                deliveryMethod: 227,
                Weight: input.Weight, //done
                X: 28,
                Y: 42,
                Z: 8,
                Quantity: 1,
                Insurance: {
                    IsInsured: false,
                    InsuranceAmount: 2.1,
                    InsuranceCurrencyID: 3,
                },
                ReceiverPerson: {
                    PersonTypeId: 2,
                    FirstName: input.ReceiverPerson.FirstName,
                    LastName: input.ReceiverPerson.LastName,
                    OrganizationName: 'null',
                    Phone: input.ReceiverPerson.Phone,
                    Email: input.ReceiverPerson.Email,
                },
                PaymentMethod: 230,
                isHand2Hand: false,
                customerParcelCode: 'dkdc13Kscm',
                declarationItems: input.declarationItems,
                needExportDeclaration: false,
            })

            var config = {
                method: 'post',
                url: 'https://istore.gpost.ge/api/RegisterParcel',
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_GEORGIAN_POST_AUTH,
                    'Content-Type': 'application/json',
                },
                data: data,
            }

            // console.log(data)

            axios(config)
                .then(function (response) {
                    console.log(response.request)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }),

    getUser: publicProcedure
        .input(z.object({ email: z.string() }))
        .query(async ({ input }) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: input.email,
                },
            })

            if (!user) return null

            return { user }
        }),

    getCity: publicProcedure.input(z.number()).query(async ({ input }) => {
        const data = JSON.stringify({})

        const config = {
            method: 'get',
            url: `https://istore.gpost.ge/api/Cities?countryId=${input}`,
            headers: {
                Authorization:
                    'Basic Vi5EQVRVS0lTSFZJTEk6RDZmdzluV3BjOU1icWtUNQ==',
                'Content-Type': 'application/json',
            },
            data: data,
        }

        const citiesData = await axios(config)

        // setCities(citiesData.data.Cities)
        return citiesData.data.Cities
    }),

    calculateParcelPrice: publicProcedure
        .input(
            z.object({
                ParcelTypeId: z.number(),
                ReceiverCityId: z.number(),

                Weight: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            var data = JSON.stringify({
                ParcelTypeId: input.ParcelTypeId, //done
                ReceiverCityId: input.ReceiverCityId, //done
                Weight: input.Weight, //done
                isExpress: false,
                X: 28,
                Y: 42,
                Z: 10,
                Quantity: 1,
                deliveryMethod: 226,
                Insurance: {
                    IsInsured: false,
                    InsuranceAmount: 2.1,
                    InsuranceCurrencyID: 3.0,
                },
                isHand2Hand: false,
            })

            var config = {
                method: 'post',
                url: 'https://istore.gpost.ge/api/Price',
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_GEORGIAN_POST_AUTH,
                    'Content-Type': 'application/json',
                },
                data: data,
            }

            // console.log(data)

            const response = await axios(config)

            return response.data
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
                const res = await fetch('https://payze.io/api/v1', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        method: 'justPay',
                        apiKey: process.env.NEXT_PUBLIC_PAYZY_API_KEY,
                        apiSecret: process.env.NEXT_PUBLIC_PAYZY_API_SECRET,
                        data: {
                            amount: input.data.amount,
                            currency: input.data.currency || 'USD',
                            callback: 'https://abjari.vercel.app/',
                            callbackError: 'https://abjari.vercel.app/cart',
                            preauthorize: false,
                            lang: input.data.lang || 'GEL',
                            hookUrl:
                                'https://corp.com/payze_hook?authorization_token=token',
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
