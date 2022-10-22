
import { Box, Container, Backdrop, CircularProgress, TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';

interface MyFormValues {
	firstName: string
	lastName: string
	country: string
	phone: string
	city: string
	address: string
}


const CheckoutForm = (): JSX.Element => {
	const initialValues: MyFormValues = { firstName: '', lastName: '', country: '', phone: '', city: '', address: '' };



	return (
		<Container>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={true}

			>
				<Box sx={{
					backgroundColor: '#fff',
					height: '20rem',
					width: '80%',
					color: '#444',
					flexWrap: 'wrap',
					display: 'flex',
					FlexDirection: 'column'
				}}>

					<Formik initialValues={initialValues} onSubmit={(data, { setSubmitting }) => {


						setSubmitting(true);

						setTimeout(() => { }, 500)
						setSubmitting(false);
					}}>
						{({ values }) => (
							<Form >
								<Box>
									<label htmlFor='firstName'>First Name</label>
									<Field id='firstName' name="firstName" placeholder="First Name" as={TextField} />
								</Box>
								<Box>
									<label htmlFor='lastName'>Last Name</label>
									<Field id='lastName' name="lastName" placeholder="Last Name" as={TextField} />
								</Box>
								<Box>
									<label htmlFor='country'>Country</label>
									<Field id='country' name="country" placeholder="Country" as={TextField} />
								</Box>
								<Box>
									<label htmlFor='phone'>Phone</label>
									<Field id='phone' name="phone" placeholder="Phone" as={TextField} />
								</Box>
								<Box>
									<label htmlFor='city'>City</label>
									<Field id='city' name="city" placeholder="City" as={TextField} />
								</Box>
								<Box>
									<label htmlFor='address'>Address</label>
									<Field id='address' name="address" placeholder="Address" as={TextField} />
								</Box>
								<pre>{JSON.stringify(values)}</pre>

								<Button variant='outlined' type="submit">Submit</Button>

							</Form>)}
					</Formik>

				</Box>


			</Backdrop>

		</Container >
	);
}

export default CheckoutForm;