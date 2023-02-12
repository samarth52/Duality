import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { motion } from "framer-motion";
import { useAuth } from "@/components/Firebase/Auth";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import WelcomeCard from "@/components/WelcomeCard";
import BubbleCard from "@/components/BubbleCard";
import LineChart from "@/components/LineChart";
import RecapCard from "@/components/RecapCard";
import FooterCard from "@/components/FooterCard";
import { useEffect, useState } from "react";

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
  const { currentUser } = useAuth();
  const [user, setUser] = useState<string>();
  const [articles, setArticles] = useState<any>([]);
  const [topics, setTopics] = useState<any>([]);
  const [avgSentiment, setAvgSentiment] = useState<any>();
  const [dualityRatio, setDualityRatio] = useState<any>();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify({ uid: currentUser.uid }),
    }).then((resp) => {
      resp.json().then((data) => {
        fetch(`http://127.0.0.1:8000/api/dashboard_data?id=${data.id}`, {
          method: "GET",
        }).then((data2) => {
          data2.json().then((data3) => {
            console.log(data3);
            setUser(data.id);
            setArticles(data3.recentArticles);
            setTopics(data3.topicFrequency);
            setAvgSentiment(data3.avgSentiment);
            setDualityRatio(data3.dualityRatio);
          });
        });
      });
    });
  }, []);

  return user ? (
    <PrivateRoute>
      <Hero>
        <Navbar />
        <Spacer size={15} />
        <Search articles={articles} />
        <Spacer size={15} />

        <ParentGrid>
          <WelcomeCard score={dualityRatio[0]} />
          <FlexPartition>
            <LineChart />
            <BubbleCard keyWords={topics} />
          </FlexPartition>
        </ParentGrid>

        <Spacer size={15} />
        <RecapCard />
        <Spacer size={15} />
        <FooterCard />
      </Hero>
    </PrivateRoute>
  ) : null;
}

const Hero = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "8vh",
  paddingBottom: "8vh",
  width: "60vw",
  gap: 10,
});

const MegaFlex = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 30,
});

const ParentGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(1, 1fr)",
  gap: 30,
});

const FlexPartition = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 30,
});
