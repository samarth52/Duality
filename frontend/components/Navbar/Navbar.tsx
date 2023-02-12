import Image from "next/image";
import Spacer from "@/components/Spacer";

import { styled } from "@/stitches.config";

import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";

import logo from "@/assets/icon.png";
import { ChevronDown } from "react-feather";

const avatar = createAvatar(adventurerNeutral, {
  seed: "mom",
  radius: 50,
});

const avatarURI = avatar.toDataUriSync();

export default function Navbar() {
  return (
    <Wrapper>
      <Date>23rd January</Date>
      <Logo>
        <Image src={logo} alt="logo" width={50} height={50} draggable={false} />
        <Spacer size={15} axis="horizontal" />
        <h1 draggable={false}>duality</h1>
      </Logo>
      <Profile />
    </Wrapper>
  );
}

function Profile() {
  return (
    <ProfileWrapper>
      <ProfileContainer>
        <Image src={avatarURI} alt="user icon" width={40} height={40} />
        <ChevronDown size={20} color="#e6e6e6" style={{ strokeWidth: 2.5 }} />
      </ProfileContainer>
    </ProfileWrapper>
  );
}

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const Date = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$grayOne",
  color: "#aaa",
  fontWeight: "semibold",
  fontSize: "1rem",
  padding: "1rem 2rem",
  borderRadius: "2rem",
});

const Logo = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "& > h1": {
    fontSize: "1.6rem",
    fontWeight: 900,
    color: "$white",
    pointerEvents: "none",
    userSelect: "none",
    draggable: "false",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
  },
});

const ProfileWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: "$grayOne",
  borderRadius: "2rem",
  padding: "0.6rem 0.7rem",
});

const ProfileContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
});
