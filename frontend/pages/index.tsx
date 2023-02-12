import Image from "next/image";
import styles from '../components/Hero/Hero.module.css'
import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";
import logo from "@/assets/icon.png";
import { motion } from "framer-motion";
import GoogleLogin from "@/components/GoogleLogin/GoogleLogin";

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

export default function Home() {
  return (
      <Center>
        <motion.div initial="hidden" animate="visible" variants={fadeInOut}  className={styles.hero_container}>
          <Hero>
          <Image src={logo} alt="logo" width={100} height={100} />
          <Spacer size={15} axis="horizontal" />
          <Title>duality</Title>
          </Hero>
          <GoogleLogin></GoogleLogin>
        </motion.div>
      </Center>
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
