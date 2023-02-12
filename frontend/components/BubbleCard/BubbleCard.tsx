import { useState, useEffect, useRef, ReactNode } from "react";

import { styled } from "@/stitches.config";
import { motion } from "framer-motion";

interface Word {
  text: ReactNode;
  name: string;
  value: number;
}

// Ugly stuff smfh
const svgString = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23aaaaaa' fill-opacity='0.08'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

function BubbleCard({ keyWords } : { keyWords: any }) {
  const containerVariants = {
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    hidden: { opacity: 0 },
  };

  const tagVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  const [keywords, setKeywords] = useState<Word[]>([]);
  const [maxVal, setMaxVal] = useState<number>(0);

  useEffect(() => {
    setMaxVal(Math.max(...keyWords.map((word : any) => word[1])));
  }, []);

  return (
    <Wrapper>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={tagVariants}>
            <Group>
              {keyWords
                .sort((a : any, b : any) => b[1] - a[1])
                .map((word : any) => (
                  <Tag
                    key={`${word[0]}+${word[1]}`}
                    style={{
                      display: "inline-block",
                      background: "#1e1e1e",
                      color: "#aaa",
                      padding: "5px 10px",
                      margin: "5px",
                      borderRadius: "5px",
                      fontSize: `${Math.max(16, (word[1] / maxVal) * 40)}px`,
                    }}
                  >
                    {word[0]}
                  </Tag>
                ))}
            </Group>
          </motion.div>
        </motion.div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  width: "100%",
  // backgroundImage: svgString,
  backgroundColor: "$grayOne",
  borderRadius: "38px",
  position: "relative",
});

const Container = styled("div", {
  height: "100%",
  width: "100%",
  padding: "25px",
});

const Group = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const Tag = styled("div", {
  display: "inline-block",
});

export default BubbleCard;
