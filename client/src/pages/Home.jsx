import React from "react";
import Blockchain from "../assets/blockchain.png";

const Home = () => {
  return (
    <div className="my-7 flex flex-col gap-7 items-center">
      <h1 className="text-2xl font-bold">Welcome To TrustBazar</h1>
      <p className="text-lg text-gray-700">
        A blockchain-powered decentralized marketplace for trading authentic
        products.
      </p>
      <img src={Blockchain} alt="Blockchain" className="w-1/2" />
    </div>
  );
};

export default Home;
