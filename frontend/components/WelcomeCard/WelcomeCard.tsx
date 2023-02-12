import { useState, useEffect } from "react";

import { styled } from "@/stitches.config";
import { motion } from "framer-motion";
import AnimatedSVGDial from "@/components/WelcomeCard/dial";

// Ugly stuff smfh
const svgString = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23aaaaaa' fill-opacity='0.06'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

function WelcomeCard() {
  const [dualityScore, setDualityScore] = useState(62);

  useEffect(() => {
    var params = {
      r: "40",
      bkgStrokeColor: "#f6feff",
      strokeColor: "url(#" + "ok" + ")",
      strokeOpacity: "1",
      value: 63,
      maxValue: 100,
      animationDuration: 1500,
      animationOffset: 0,
      gradient: {
        type: "linear",
        id: "ok",
        x1: "0%",
        y1: "60%",
        x2: "50%",
        y2: "0%",
        stops: [
          {
            offset: "0%",
            color: "#ffda1f",
            opacity: "1",
          },
          {
            offset: "100%",
            color: "#fc1e43",
            opacity: "1",
          },
        ],
      },
    };
    const dial: any = new AnimatedSVGDial("#dial-welcome-card", params);
    dial.animate();
  }, [dualityScore]);

  return (
    <Wrapper>
      <Container>
        <Content>
          <Subheading>Welcome</Subheading>
          <Heading>Utkarsh</Heading>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Dial id={"dial-welcome-card"} />
            <div
              style={{
                position: "absolute",
                top: "calc(50% - 43px)",
              }}
            >
              <SmallSubheading>your duality score</SmallSubheading>
              <SmallHeading>63%</SmallHeading>
            </div>
          </div>
        </Content>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  width: "100%",
  height: "100%",
  backgroundImage: svgString,
  backgroundColor: "$grayOne",
  borderRadius: "38px",
  // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  padding: "50px 80px",
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
});

const Dial = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const SmallSubheading = styled("h3", {
  fontSize: ".8rem",
  color: "$gray",
  fontWeight: "500",
  textAlign: "center",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

const SmallHeading = styled("h1", {
  fontSize: "5rem",
  color: "$white",
  fontWeight: "800",
  textAlign: "center",
  lineHeight: 1,
});

const Subheading = styled("h2", {
  fontSize: "1.1rem",
  color: "$gray",
  fontWeight: "500",
  textAlign: "center",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

const Heading = styled("h1", {
  fontSize: "3rem",
  color: "$white",
  fontWeight: "800",
  textAlign: "center",
  lineHeight: 1,
});

export default WelcomeCard;
