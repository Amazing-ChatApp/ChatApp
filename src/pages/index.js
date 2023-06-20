import Image from "next/image";
import { Inter } from "next/font/google";
import SignIn from "@/components/SignIn.js";
import Chat from "@/components/chat";
import { useState,useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function App() {
  const [user, setUser] = useState(null);
  //Initial value of user is set to the value of email in localstorage.
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("email")));
  }, []);

  return (
    <>
      {/*If user value is null then display signin component else display chat component*/}
      {user ? <Chat user={user} /> : <SignIn user={user} setUser={setUser} />}
    </>
  );
}

export default App;
