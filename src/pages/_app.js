import '@/styles/globals.css'
import { useEffect } from "react";
import { FireAuthProvider } from '@/firebase/fire_auth_context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <FireAuthProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-left" autoClose={3000} />
      </FireAuthProvider>
    </>
  )
}
