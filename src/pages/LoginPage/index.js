import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPage = () => {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();
  // returns current path.
  const { pathname } = useLocation();
  const auth = getAuth();
  var provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const ref = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (pathname === "/") navigate("/main");
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);

        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Content>
        <Center>
          <LogoOne src="/images/그림1.png" alt="logo-one" />
          <SignUpLink onClick={handleAuth}>
            Get access to your best Stock Market Partner
          </SignUpLink>
          <LogoTwo src="/images/logo1.png" alt="logo-two" />
          {/* <Description>
            
          </Description> */}
        </Center>
        <BgImage />
      </Content>
    </Container>
  );
};

export default LoginPage;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-image: url("/images/background2.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
  background-repeat: no-repeat;
`;

const Container = styled.section/*css*/ `
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 40px 40px;
  height: 100%;
`;

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoOne = styled.img`
  /* margin-bottom: 12px; */
  max-width: 600px;
  min-height: 1px;

  display: block;
  width: 100%;
`;

const SignUpLink = styled.button`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  /* margin-bottom: 12px; */
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  color: white;
`;

const LogoTwo = styled.img`
  max-width: 600px;
  // margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;
