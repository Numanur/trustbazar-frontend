import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = "AIzaSyD4kwpr4MXiPSPnon_LI4scI_Gfn7dkgJA";
const FIREBASE_APP_ID = "1:378539980411:web:c6f7494f82828bbf63d4de";

// Web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: FIREBASE_API_KEY,
//     authDomain: "zenshop-a95d9.firebaseapp.com",
//     projectId: "zenshop-a95d9",
//     storageBucket: "zenshop-a95d9.appspot.com",
//     messagingSenderId: "378539980411",
//     appId: FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCDl9RNxau1wf4BdTTmZrko41mcKX_inJY",
  authDomain: "trustbazar.firebaseapp.com",
  projectId: "trustbazar",
  storageBucket: "trustbazar.firebasestorage.app",
  messagingSenderId: "95438939228",
  appId: "1:95438939228:web:e1d5492cfda3035dbab299",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
