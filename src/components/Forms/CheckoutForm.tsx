import {
    Container,
    Backdrop,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Box,
    Typography,
    Autocomplete,
    Modal,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProduct } from '../../lib/types/productType'
import { CartItem, useCartStore } from '../../store/cartStore'
import shallow from 'zustand/shallow'
import { urlFor } from '../../lib/sanityClient'
import { useHasMounted } from '../../Hooks/hasMounted'
import { CityType, CountryType, useBearStore } from '../../store/store'
import { useEffect, useState } from 'react'
import { trpcClient } from '../../server/client'
import { trpc } from '../../utils/trpc'
import axios from 'axios'
import Footer from '../layout/Footer'

// * Валидация формы
type IFormInputs = {
    email: string
    zip: string
    phone: string
    city: number
    address: string
    parcelType: number
    firstName: string
    lastName: string
    country: string
}

// * Данные для отправки на сервер
interface ParcelQuery {
    ReceiverCityId: number
    ParcelTypeId: number
    ReceiverAddressNote: string
    ZIP: string
    IsExpress: boolean
    deliveryMethod: number
    Weight: number
    ReceiverPerson: {
        FirstName: string
        LastName: string
        Phone: string
        Email: string
    }
    declarationItems: {
        declarationItemID: number
        comment: string
        currencyId: number
        itemCount: number
        itemPrice: number
        itemWeigth: number
    }[]
}

// * Пропсы компонента
interface IFormProps {
    onSubmit?: (data: IFormInputs) => void
    onCloseForm: () => void
    isVisible: boolean
    products: IProduct[]
    countries: CountryType[]
}

// * Схема валидации
const schema = z.object({
    email: z.string().email().min(1),
    zip: z.string().min(3),
    phone: z
        .string()
        .regex(
            new RegExp(
                /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{1,3})[-. ]*(\d{1,4})[-. ]*(?: *(\d+))?\s*$/g
            )
        ),
    city: z.number().min(1),
    address: z.string().min(3),
    parcelType: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    country: z.object({
        CountryId: z.number(),
        CountryNameEn: z.string(),
        CountryNameRu: z.string(),
        CountryNameGe: z.string(),
    }),
})

// * Компонент формы
const CheckoutForm = ({
    products,
    onCloseForm,
    isVisible,
    countries,
}: IFormProps): JSX.Element => {
    // * Связь со стейтом корзины
    const { cart, getCartItem, getFullSum } = useCartStore(
        (state) => ({
            cart: state.cart,
            getCartItem: state.getCartItem,
            getFullSum: state.getFullSum,
        }),
        shallow
    )

    // * Хук для работы с формой
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: zodResolver(schema) })

    const parcelData = watch(['parcelType', 'city'])

    // * Хук для проверки монтирования компонента
    const hasMounted = useHasMounted()

    // * Локальный стейт
    const [cities, setCities] = useState<CityType[]>([])
    const [countryId, setCountryId] = useState<number>(63)
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0)
    const [deliveryError, setDeliveryError] = useState<string>('')
    const [finalCost, setFinalCost] = useState<number>(getFullSum())
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // * Переход к оплате
    const mutation = trpc.pay.useMutation()
    useEffect(() => {
        const { data } = mutation

        if (data === undefined) return
        setIsButtonDisabled(true)

        window.location.href = data
    }, [mutation])

    // * Расчет веса заказа
    const cartItemsWeight = () => {
        if (cart.length === 0) return 0

        return cart.reduce<number>((acc: number, i: CartItem) => {
            const { quantity } = i

            const product: IProduct | undefined = products.find(
                (product) => product._id === i._id
            )

            if (!product) return acc

            const productWeight: number | undefined = Number(
                product.details?.find((p) => p.size === i.size)?.weight
            )

            if (!productWeight) return acc

            if (!productWeight || typeof Number(productWeight) !== 'number')
                return acc

            return Number(productWeight) * quantity + acc
        }, 0)
    }

    // * Расчет стоимости доставки

    useEffect(() => {
        setIsButtonDisabled(true)
        const getPrice = async () => {
            if (parcelData[0] !== undefined && parcelData[1] !== undefined) {
                const parcelPrice =
                    await trpcClient.calculateParcelPrice.mutate({
                        ParcelTypeId: Number(parcelData[0]),
                        ReceiverCityId: Number(parcelData[1]),
                        Weight: cartItemsWeight() ?? 1,
                    })

                if (parcelPrice.Status.Code !== '200') {
                    setDeliveryError(parcelPrice.Status.Description)
                } else {
                    setFinalCost(getFullSum() + parcelPrice.Price)
                    setDeliveryError('')
                }
                setDeliveryPrice(parcelPrice.Price)
            }
        }
        getPrice()
        if (deliveryPrice) setIsButtonDisabled(false)
    }, [parcelData])

    // * Смена страны
    const handleChangeCountry = (value: number) => {
        if (value) setCountryId(value)
        setIsButtonDisabled(false)
    }

    // * Получение городов
    useEffect(() => {
        trpcClient.getCity.query(countryId).then((res) => setCities(res))
    }, [countryId])

    // * Обработчик отправки формы
    const formSubmitHandler: SubmitHandler<IFormInputs> = async (
        data: IFormInputs
    ) => {
        // * Данные из формы
        const {
            email,
            phone,
            city,
            address,
            zip,
            parcelType,
            firstName,
            lastName,
        } = data

        // * Данные для отправки (declarationItems)
        const declarationItems = cart.map((item: CartItem):
            | {
                  declarationItemID: number
                  comment: string
                  currencyId: number
                  itemCount: number
                  itemPrice: number
                  itemWeigth: number
              }
            | undefined => {
            const product: IProduct | undefined = products.find(
                (product) => product._id === item._id
            )

            if (!product) return

            const productWeight: string | undefined = product.details?.find(
                (p) => p.size === item.size
            )?.weight

            if (!productWeight || typeof Number(productWeight) !== 'number')
                return

            return {
                declarationItemID: 336441,
                comment: product.name,
                currencyId: 1,
                itemCount: 1,
                itemPrice: product.pricegel,
                itemWeigth: +productWeight,
            }
        })

        // * Данные для грузинской почты
        const query = {
            ReceiverCityId: city,
            ParcelTypeId: +parcelType,
            ReceiverAddressNote: address,
            ZIP: zip,
            IsExpress: false,
            deliveryMethod: 227,
            Weight: cartItemsWeight(),
            ReceiverPerson: {
                FirstName: firstName,
                LastName: lastName,
                Phone: phone,
                Email: email,
            },
            declarationItems,
        } as ParcelQuery

        // * Отправка данных
        trpcClient.sendParcel.mutate(query).then((res) => console.log(res))

        // * Отправка данных в пейзи
        await mutation.mutateAsync({
            data: {
                amount: +finalCost,
                currency: 'GEL',
                lang: 'EN',

                info: {
                    name: products[0].name,
                    description: 'Your order from Abjari',
                    image: urlFor(products[0].image[0]).url(),
                },
            },
        })
    }

    return (
        <Backdrop
            sx={{
                height: '100%',
            }}
            open={isVisible}
        >
            <Modal
                open={isVisible}
                disableScrollLock
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    {/* Основной контейнер */}
                    <Container
                        className="checkout-form"
                        sx={{
                            backgroundColor: 'white',
                        }}
                    >
                        {/* Продукты из корзины */}
                        <Box className="checkout-form__cart">
                            {hasMounted && products ? (
                                products?.map((item) => {
                                    const cartItem = getCartItem(item._id)
                                    const product = products.find(
                                        (product) =>
                                            product._id === cartItem?._id
                                    )

                                    if (!product) return null

                                    return (
                                        <Box
                                            className="checkout-form__item"
                                            key={product._id}
                                        >
                                            <Box>
                                                <img
                                                    src={urlFor(
                                                        product.image[0]
                                                    ).url()}
                                                    alt=""
                                                />
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.8rem',
                                                    }}
                                                    variant="h6"
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {product.pricegel}₾
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span
                                                        style={{
                                                            fontWeight: 500,
                                                            paddingRight: 5,
                                                        }}
                                                    >
                                                        x{cartItem?.quantity}
                                                    </span>
                                                    size:
                                                    <span
                                                        style={{
                                                            fontWeight: 500,
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        {cartItem?.size}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )
                                })
                            ) : (
                                <Typography
                                    sx={{
                                        mt: 6,
                                    }}
                                    variant="h6"
                                >
                                    The cart is empty
                                </Typography>
                            )}
                            <Typography variant="h6">
                                Total {hasMounted && getFullSum()}₾
                            </Typography>
                        </Box>

                        {/* Форма */}
                        <form
                            className="checkout-form__form"
                            onSubmit={handleSubmit(formSubmitHandler)}
                        >
                            <Typography
                                variant="h4"
                                sx={{ textAlign: 'center' }}
                            >
                                Checkout
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => onCloseForm()}
                                sx={{
                                    marginBottom: '1rem',
                                }}
                            >
                                Close
                            </Button>
                            <Box className="checkout-form__form_name">
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue="Ian"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="checkout-form__form-input"
                                            label="First name"
                                            type={'text'}
                                            variant="outlined"
                                            error={!!errors.firstName}
                                            helperText={
                                                errors.firstName
                                                    ? errors.firstName?.message
                                                    : ''
                                            }
                                            fullWidth={false}
                                        />
                                    )}
                                />
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue="Smith"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Last Name"
                                            className="checkout-form__form-input"
                                            type={'lastName'}
                                            variant="outlined"
                                            error={!!errors.lastName}
                                            helperText={
                                                errors.lastName
                                                    ? errors.lastName?.message
                                                    : ''
                                            }
                                            fullWidth={false}
                                        />
                                    )}
                                />
                            </Box>
                            <Box className="checkout-form__form_contacts">
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue="example@mail.ge"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            type={'email'}
                                            className="checkout-form__form-input"
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={
                                                errors.email
                                                    ? errors.email?.message
                                                    : ''
                                            }
                                            fullWidth={false}
                                        />
                                    )}
                                />
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue="+1(234)567-89-01"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Phone number"
                                            className="checkout-form__form-input"
                                            variant="outlined"
                                            error={!!errors.phone}
                                            helperText={
                                                errors.phone
                                                    ? errors.phone?.message
                                                    : ''
                                            }
                                            fullWidth={false}
                                        />
                                    )}
                                />
                            </Box>
                            <Box
                                className="checkout-form__form_city"
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...register('country')}
                                            options={countries}
                                            onChange={(e, value) => {
                                                handleChangeCountry(
                                                    Number(value?.CountryId) ??
                                                        1
                                                )
                                                field.onChange(value)
                                            }}
                                            fullWidth={true}
                                            autoHighlight
                                            getOptionLabel={(option) =>
                                                option.CountryNameEn
                                            }
                                            renderOption={(props, option) => (
                                                <Box {...props} component="li">
                                                    {option?.CountryNameEn ??
                                                        option?.CountryNameGe}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    sx={{
                                                        padding: '1rem',
                                                    }}
                                                    {...params}
                                                    label="Choose a country"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        // autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                    error={!!errors.country}
                                                    helperText={
                                                        errors.country
                                                            ? errors.country
                                                                  ?.message
                                                            : ''
                                                    }
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...register('city')}
                                            onChange={(e, value) =>
                                                // setReceiverCityId(value?.CityId!)
                                                field.onChange(value?.CityId)
                                            }
                                            options={cities}
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) =>
                                                option.CityNameEn ===
                                                value.CityNameEn
                                            }
                                            autoHighlight
                                            getOptionLabel={(option) =>
                                                option.CityNameEn
                                            }
                                            fullWidth={true}
                                            disabled={cities.length === 0}
                                            renderOption={(props, option) => (
                                                <Box
                                                    {...props}
                                                    key={option.CityId}
                                                    component="li"
                                                >
                                                    {option?.CityNameEn ??
                                                        option?.CityNameGe}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                        padding: '1rem',
                                                    }}
                                                    label="Choose a city"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                    }}
                                                    error={!!errors.city}
                                                    helperText={
                                                        errors.city
                                                            ? errors.city
                                                                  ?.message
                                                            : ''
                                                    }
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Box>
                            <Box>
                                <Controller
                                    name="zip"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={'111111'}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            sx={{
                                                width: '30%',
                                            }}
                                            className="checkout-form__form-input-wide"
                                            {...register('zip')}
                                            fullWidth={false}
                                            label="Postal code"
                                            type="number"
                                            variant="outlined"
                                            error={!!errors.zip}
                                            helperText={
                                                errors.zip
                                                    ? errors.zip?.message
                                                    : ''
                                            }
                                        />
                                    )}
                                />
                                <Controller
                                    name="address"
                                    control={control}
                                    defaultValue="Ul Pushkina"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Your address"
                                            sx={{
                                                width: '70%',
                                            }}
                                            className="checkout-form__form-input-wide"
                                            variant="outlined"
                                            error={!!errors.address}
                                            helperText={
                                                errors.address
                                                    ? errors.address?.message
                                                    : ''
                                            }
                                        />
                                    )}
                                />
                            </Box>
                            <Box>
                                <Controller
                                    name="parcelType"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup {...field}>
                                            <FormControlLabel
                                                value={69.0}
                                                control={<Radio size="small" />}
                                                label="Avia - 3-6 days"
                                            />
                                            <FormControlLabel
                                                value={40.0}
                                                control={<Radio size="small" />}
                                                label="Plain delivery - 7-21 days"
                                            />
                                            <FormControlLabel
                                                value={39.0}
                                                control={<Radio size="small" />}
                                                label="Local delivery - 1-5 days"
                                            />
                                            <FormControlLabel
                                                value={55.0}
                                                control={<Radio size="small" />}
                                                label="EMS - 6-9 days"
                                            />
                                        </RadioGroup>
                                    )}
                                />

                                <Box>
                                    {hasMounted && !deliveryError && (
                                        <Typography variant="h6">
                                            The total cost of your parcel with
                                            Delivery:{' '}
                                            {getFullSum() + deliveryPrice}₾
                                        </Typography>
                                    )}
                                    {hasMounted && deliveryError && (
                                        <Typography variant="h6">
                                            {deliveryError}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            <LoadingButton
                                variant="contained"
                                fullWidth={true}
                                type="submit"
                                loading={deliveryError.length > 0}
                                disabled={isButtonDisabled}
                            >
                                Go to payment
                            </LoadingButton>
                            <Footer />
                        </form>
                    </Container>
                </Box>
            </Modal>
        </Backdrop>
    )
}

export default CheckoutForm
