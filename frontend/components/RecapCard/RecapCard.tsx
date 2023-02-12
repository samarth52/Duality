import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { styled } from "@/stitches.config";

function move(array: any, fromIndex: number, toIndex: number) {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
  return array;
}

const CARD_COLORS = ["#266678", "#cb7c7a", " #36a18b", "#cda35f", "#747474"];
const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const CardStack = () => {
  const [cards, setCards] = useState(CARD_COLORS);
  
  const moveToEnd = (from: any) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <WrapperStyle>
      hi
      <CardWrapStyle>
        {cards.map((color, index) => {
          const canDrag = index === 0;
          return (
            <motion.li
              key={color}
              style={{
                position: "absolute",
                width: "350px",
                height: "220px",
                borderRadius: "8px",
                transformOrigin: "top center",
                listStyle: "none",
                backgroundColor: color,
                cursor: canDrag ? "grab" : "auto",
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARD_COLORS.length - index,
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              onDragEnd={() => moveToEnd(index)}
            />
          );
        })}
      </CardWrapStyle>
    </WrapperStyle>
  );
};

function RecapCard() {
  return (
    <Wrapper>
      <Container>
        <Heading>Today's Recap</Heading>
        <CardStack />
        {/* <Cards>{renderCards()}</Cards> */}
      </Container>
    </Wrapper>
  );
}

const WrapperStyle = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const CardWrapStyle = styled("ul", {
  position: "relative",
  width: "350px",
  height: "220px",
});

const Wrapper = styled("div", {
  width: "100%",
  height: "300px",
  backgroundColor: "$grayOne",
  borderRadius: "38px",
  position: "relative",
  // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "50px 80px",
  width: "100%",
  position: "relative",
});

const Heading = styled("h1", {
  fontSize: "2rem",
  color: "$white",
  fontWeight: "700",
  textAlign: "center",
  lineHeight: 1,
});

const Cards = styled("div", {
  height: "200px",
  width: "100%",
  display: "grid",
  placeItems: "center center",
});

const SingleCard = styled("div", {
  position: "absolute",
  left: 0,
  top: 0,
  height: 150,
  width: 150,
  borderRadius: 15,
  color: "$white",
  display: "grid",
  placeItems: "center center",
  padding: 10,
  "& > p": {
    fontSize: "1.2rem",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default RecapCard;
