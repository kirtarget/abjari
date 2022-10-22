import { useSession, signIn, signOut } from "next-auth/react"
import Layout from "../components/UI/Layout"
import { trpc } from '../utils/trpc';

const Login = () => {
  const { data: session } = useSession()
  let content


  if (session) {
    content = (
      <div>
        <h1>You are logged in as {session.user?.email}</h1>
        <img
          src={
            "https://res.cloudinary.com/demo/image/fetch/" +
            session.user?.image!
          }
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  } else {
    content = (
      <>
        <h1>You are not logged in</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
  return <>{content}</>
}

export default Login
