import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { urlFor } from '../../lib/sanityClient'
import { IWearUs } from '../../lib/types/apiTypes'
import InstagramIcon from '@mui/icons-material/Instagram'

const WearUs = ({ data }: { data: IWearUs }) => {
    const { name, desc, image, socialLink } = data
    return (
        <Container className="wear-us__card">
            <Box>
                <Box className="wear-us__image">
                    <img src={urlFor(image)?.url()} />
                </Box>
                <Box className="wear-us__text">
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body1">{desc}</Typography>
                </Box>
            </Box>
            <Link href={socialLink}>
                <Button
                    startIcon={<InstagramIcon />}
                    fullWidth={true}
                    size="small"
                    color="secondary"
                    variant="contained"
                >
                    See on Instagram
                </Button>
            </Link>
        </Container>
    )
}

export default WearUs
