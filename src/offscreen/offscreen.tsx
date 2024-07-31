import React from "react";
import ReactDOM from "react-dom/client";
import "./offscreen.css";
import { auth } from "../utils/firebase_config";
import { signInWithCustomToken } from "firebase/auth";

const App: React.FC<{}> = () => {
  const handleLogin = () => {
    chrome.runtime.sendMessage({ action: "login" }, (res) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      } else {
        console.log(res);
      }
    });
  };

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveLink") {
      const handleAuthStateChanged = new Promise(async (resolve) => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            resolve({
              status: "Success",
              user: await user?.getIdToken(),
            });
          } else {
            handleLogin();
          }
        });
      });

      handleAuthStateChanged.then((response) => {
        sendResponse(response);
      });

      return true;
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "loginWithCustomToken") {
      const handleAuthStateChanged = new Promise(async (resolve) => {
        resolve({
          message: await signInWithCustomToken(auth, message.idToken),
        });
      });

      handleAuthStateChanged.then((response) => {
        sendResponse(response);
      });

      return true;
    }
  });

  return (
    <div>
      <h1>offscreen page</h1>
    </div>
  );
};

const popupContainer = document.createElement("div");
popupContainer.className = "w-full h-full";
document.body.appendChild(popupContainer);
const root = ReactDOM.createRoot(popupContainer);
root.render(<App />);
