import { Container, Backdrop, TextField } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// interface MyFormValues {
//   firstName: string;
//   lastName: string;
//   country: string;
//   phone: string;
//   city: string;
//   address: string;
// }

type IFormInputs = {
    email: string

    phone: string
    city: string
    address: string
}

const schema = z.object({
    email: z.string().email().min(1),

    phone: z
        .string()
        .regex(
            new RegExp(
                /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{1,3})[-. ]*(\d{1,4})[-. ]*(?: *(\d+))?\s*$/g
            )
        ),
    city: z.string().min(3),
    address: z.string().min(3),
})

const CheckoutForm = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: zodResolver(schema) })

    const formSubmitHandler: SubmitHandler<IFormInputs> = (
        data: IFormInputs
    ) => {
        console.log(data)
    }
    return (
        <Backdrop sx={{ zIndex: 200 }} open={true}>
            <Container sx={{ backgroundColor: 'white' }}>
                <form
                    onSubmit={handleSubmit(formSubmitHandler)}
                    style={{
                        backgroundColor: '#fff',
                        width: '50%',
                        height: '50%',
                        display: 'flex',
                        padding: '10px',
                        gap: 12,
                        flexDirection: 'column',
                    }}
                >
                    <Controller
                        name="email"
                        control={control}
                        defaultValue="example@.mail.ge"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                type={'email'}
                                variant="outlined"
                                error={!!errors.email}
                                helperText={
                                    errors.email ? errors.email?.message : ''
                                }
                                fullWidth={true}
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
                                variant="outlined"
                                error={!!errors.phone}
                                helperText={
                                    errors.phone ? errors.phone?.message : ''
                                }
                                fullWidth={true}
                            />
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        defaultValue="Tbilisi"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Your city"
                                variant="outlined"
                                error={!!errors.city}
                                helperText={
                                    errors.city ? errors.city?.message : ''
                                }
                                fullWidth={true}
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
                                variant="outlined"
                                error={!!errors.address}
                                helperText={
                                    errors.address
                                        ? errors.address?.message
                                        : ''
                                }
                                fullWidth={true}
                            />
                        )}
                    />

                    <button type="submit">dkdk</button>
                </form>
            </Container>
        </Backdrop>
    )
}

export default CheckoutForm
