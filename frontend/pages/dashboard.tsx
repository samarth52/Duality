import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import WelcomeCard from "@/components/WelcomeCard";

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
        <Spacer size={15} />
        <Search />
        <Spacer size={15} />
        <ParentGrid>
            <WelcomeCard />
        </ParentGrid>
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

const ParentGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: 30,
});
