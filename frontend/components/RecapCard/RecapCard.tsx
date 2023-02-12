import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "@/stitches.config";
import Spacer from "@/components/Spacer";

import Image from "next/image";

// function Card() {
//   return (
//     <div className="card">
//       <div className="card__imgContainer">
//         <span className="card__imgOverlay">
//           <svg
//             className="card__imgOverlayViewIcon"
//             width={48}
//             height={48}
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g fill="none" fillRule="evenodd">
//               <path d="M0 0h48v48H0z" />
//               <path
//                 d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15Zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10Zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z"
//                 fill="#FFF"
//                 fillRule="nonzero"
//               />
//             </g>
//           </svg>
//         </span>
//         <img
//           width="300px"
//           height="300px"
//           src="https://raw.githubusercontent.com/mohammadjarabah/codepen-assets/main/pens/dyjrRrX/images/equilibrium.jpg"
//           alt="Equilibrium Image"
//           className="card__img"
//         />
//       </div>
//       <a href="#emptyLink" className="card__title">
//         Equilibrium #3429
//       </a>
//       <p className="card__desc">From US News</p>
//     </div>
//   );
// }

function RecapCard() {
  return (
    <Wrapper>
      <Content>
        <Title>
          Recently, you ignored 5 of our suggestions which could have given you
          different perspectives.{" "} 
        </Title>
        <Spacer size={10} />
        <Sub>Chinese spy balloon - live: Pentagon retrieving second car size object shot down bby F22 jets over Alaska.</Sub>
      </Content>
    </Wrapper>
  );
}

const Sub = styled("span", {
  background: "#aaa",
  padding: "5px 10px",
  margin: "0 5px",
  width: "fit-content",
  fontSize: "1.2rem",
  borderRadius: "8px",
  color: "#000",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: "#fff",
  },
});

const Wrapper = styled("div", {
  backgroundColor: "$grayOne",
  borderRadius: "30px",
});

const Content = styled("div", {
  padding: 25,
});

const Title = styled("h1", {
  color: "#aaa",
  fontSize: "1.5rem",
});



export default RecapCard;
