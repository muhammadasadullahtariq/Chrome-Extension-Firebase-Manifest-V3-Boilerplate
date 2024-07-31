import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import { FEATURES } from "../constant/features";
import useFirebaseAuthentication from "../utils/useFirebaseAuth";
import { auth } from "../utils/firebase_config";
import { NavBar } from "../components/global/NavBar";

const App: React.FC<{}> = () => {
  const [links, setLinks] = useState([]);
  const firebaseUser = useFirebaseAuthentication();
  const [isOpen, setIsOpen] = useState(false);

  function initialLinkHandler() {
    chrome.storage.local.get({ unSavedLinks: [] }, async (result) => {
      const unSavedLinks = result.unSavedLinks;
      setLinks(unSavedLinks);
    });
  }

  const handleLogin = () => {
    chrome.runtime.sendMessage({ action: "login" }, (res) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      } else {
        console.log(res);
      }
    });
  };

  async function handleLogout() {
    auth.signOut();
    chrome.storage.local.set({ unSavedLinks: [] });
    if (await chrome.offscreen.hasDocument()) {
      chrome.offscreen.closeDocument();
    }
  }

  function handleSideBar() {
    setIsOpen((sideBar) => !sideBar);
  }

  useEffect(() => {
    if (firebaseUser) {
      initialLinkHandler();
    }
  }, [firebaseUser]);

  return (
    <div className=" w-full h-full">
      <div className="flex flex-col h-full w-full">
        {firebaseUser == null ? (
          <div className="h-full">
            <div className="h-[1px] w-full bg-gray-200" />
            <h2 className="mt-2 ml-5 text-main text-xl p-1 font-lg">
              Login to Firebase
            </h2>
            <div className="flex flex-1 justify-between flex-col h-full pb-5">
              <div className="flex flex-col ml-5 mb-2">
                {FEATURES.map((feature) => (
                  <div className="flex mt-2 items-center" key={feature.title}>
                    <img src={feature.image} height={18} width={22} />
                    <p className="text-main text-lg text-slate-600 font-medium ml-2">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className=" bg-[#003566] flex rounded-lg h-10 w-[80%] items-center justify-center self-center hover:cursor-pointer"
                onClick={handleLogin}
              >
                <h1 className=" justify-center text-main font-xl text-white">
                  Login / Create Account
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NavBar
              image={firebaseUser.photoURL}
              handleSideBar={handleSideBar}
            />
            <div
              className={`absolute top-0 right-0 h-full max-w-[312px] w-full bg-white z-50 transition-all duration-300 ease-out py-5 ${
                !isOpen ? "translate-x-full" : "translate-x-0"
              }`}
            >
              <div className="flex gap-1 flex-col">
                <img
                  className="ml-2 h-[24px] w-[24px] hover:cursor-pointer"
                  onClick={handleSideBar}
                  src={require("../static/cross.svg")}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <h2 className="mt-2 ml-2 mb-3 text-main text-xl p-1 font-lg">
              Pop up is working
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const popupContainer = document.createElement("div");
popupContainer.className = "w-full h-full";
document.body.appendChild(popupContainer);
const root = ReactDOM.createRoot(popupContainer);
root.render(<App />);
