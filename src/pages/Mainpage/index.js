import React from "react";
import Nav from "../../components/Nav";
import { Pulsar } from "@uiball/loaders";
import { Dna } from "react-loader-spinner";
const MainPage = () => {
  return (
    <>
      <Nav />
      <div>MainPage</div>\
      {/* <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      /> */}
    </>
  );
};

export default MainPage;
