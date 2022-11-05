import { Button, Container } from "@mui/material";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { GetServerSideProps, NextPage } from "next";
import { useHasMounted } from "../Hooks/hasMounted";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { useUserStore } from "../store/userStore";

const Profile: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {session?.user?.email}</p>;
  }

  return <a href="/api/auth/signin">Sign in</a>;
};

export default Profile;
