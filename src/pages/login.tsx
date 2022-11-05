import { Button, Container } from '@mui/material'
import { useSession, signIn, getProviders } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'
import { useHasMounted } from '../Hooks/hasMounted'

const Login: NextPage<{
    providers: { name: string; id: string }[]
}> = ({ providers }) => {
    const { data: session } = useSession()

    const hasMounted = useHasMounted()

    if (!hasMounted) {
        return <Container>Loading...</Container>
    }

    return (
        <Container className="login">
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <Button
                        variant="contained"
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: `${window.location.origin}/`,
                            })
                        }
                    >
                        Sign in with {provider.name}
                    </Button>
                    {session?.user?.name}
                </div>
            ))}
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}

export default Login
