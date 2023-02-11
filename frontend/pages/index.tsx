import Image from "next/image";

import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";
import logo from "@/assets/icon.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { motion } from "framer-motion";

const fadeInOut = {
  hidden: { scale: .8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
}

const onSuccess = (googleUser) => {    
  fetch('http://localhost:3000/api/login', {
    accessToken: googleUser.getAuthResponse().id_token,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

const onFailure = (error) => {
  console.error(error);
};

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Center>
        <motion.div initial="hidden" animate="visible" variants={fadeInOut}>
          <Hero>
          <Image src={logo} alt="logo" width={100} height={100} />
          <Spacer size={15} axis="horizontal" />
          <Title>duality</Title>
          </Hero>
          <GoogleLogin buttonText="Login with Google"
              onSuccess={onSuccess}
              onFailure={onFailure} />
        </motion.div>
      </Center>
    </GoogleOAuthProvider>
  );
}

const Center = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const Hero = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled("h1", {
  fontSize: "4rem",
  color: "$white",
});
