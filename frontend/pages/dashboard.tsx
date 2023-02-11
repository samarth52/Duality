import Image from "next/image";

import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";
import logo from "@/assets/icon.png";

import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";

const fadeInOut = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

export default function Dashboard() {
  return (
    <Hero>
        <Navbar />
    </Hero>
  );
}


const Hero = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
});

const Title = styled("h1", {
  fontSize: "4rem",
  color: "$white",
});
