import Image from "next/image";

import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";
import logo from "@/assets/icon.png";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Search from "@/components/Search";

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
    <PrivateRoute>
      <Hero>
        <Navbar />
      </Hero>
    </PrivateRoute>
  );
}

const Hero = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "8vh",
  width: "60vw",
  gap: 10,
});

const Title = styled("h1", {
  fontSize: "4rem",
  color: "$white",
});
