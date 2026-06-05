// import Blockchain from "../assets/blockchain.png";

// const Home = () => {
//   return (
//     <div className="my-7 flex flex-col gap-7 items-center">
//       <h1 className="text-2xl font-bold">Welcome To TrustBazar</h1>
//       <p className="text-lg text-gray-700">
//         A blockchain-powered decentralized marketplace for trading authentic
//         products.
//       </p>
//       <img src={Blockchain} alt="Blockchain" className="w-1/2" />
//     </div>
//   );
// };

// export default Home;

import HomeHero from "../components/home/HomeHero";
import TrustMetrics from "../components/home/TrustMetrics";
import HowItWorks from "../components/home/HowItWorks";
import SecurityFeatures from "../components/home/SecurityFeatures";
import VerificationCTA from "../components/home/VerificationCTA";
import HomeFooterCTA from "../components/home/HomeFooterCTA";

const Home = () => {
  return (
    <main className="bg-slate-50 text-slate-900">
      <HomeHero />
      <TrustMetrics />
      <HowItWorks />
      <SecurityFeatures />
      <VerificationCTA />
      <HomeFooterCTA />
    </main>
  );
};

export default Home;
