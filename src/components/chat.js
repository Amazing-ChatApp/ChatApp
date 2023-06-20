import { useState, useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";
import Header from "./Header";
import { IsTyping } from "react-chat-engine";

const Chat = ({ user }) => {
  const [userAuthenticated, setUserAutheticated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = {
          "Private-Key": process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY,
        };
        /*PUT request is used for creating a user with username and secret if he doesnt exist 
        and if it exists then signing them in */
        const response = await axios.put(
          "https://api.chatengine.io/users/",
          {
            username: user.displayName,
            email: user.email,
            secret: user.uid,
          },
          { headers: authObject }
        );

        // Handle the response here (e.g., update state with the response data)
        console.log(response.data);
        setUserAutheticated(true);
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <Header user={user} />
      {userAuthenticated ? (
        <div style={{ fontFamily: "Quicksand" }}>
          <ChatEngine
            projectID={process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID}
            userName={user.displayName}
            userSecret={user.uid}
            height="87vh"
            renderIsTyping={(typers) => <IsTyping />}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Chat;
