import testAPI from "../services/api/testAPI";
import { parseCustomToken } from "../utils/parseLogin";
let creating;
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    contexts: ["page"],
    title: "checking extension",
    id: "page-link",
  });
  return true;
});
console.log("Background script is running");

async function hasOffscreenDocument() {
  return await chrome.offscreen.hasDocument();
}
async function setupOffscreenDocument() {
  const offscreenUrl = chrome.runtime.getURL("offscreen.html");
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return;
  }

  // create offscreen document
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: [chrome.offscreen.Reason.WORKERS],
      justification: "checking the current user and getting user auth token",
    });
    await creating;
    creating = null;
  }
}

//getting token here and calling API
const handleLink = async (link: string, token: string) => {
  testAPI(token);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "login") {
    chrome.tabs.onUpdated.removeListener(parseCustomToken);
    chrome.tabs
      .create({
        url: "http://localhost:3002/extension-login",
        active: true,
      })
      .then(async (tab) => {
        const token = chrome.tabs.onUpdated.addListener(parseCustomToken);
        sendResponse(token);
      });
  }
});

chrome.contextMenus.onClicked.addListener(async (event) => {
  if (event.menuItemId === "page-link") {
    if (!(await hasOffscreenDocument())) {
      await setupOffscreenDocument();
    }
    chrome.runtime.sendMessage(
      {
        action: "saveLink",
      },
      (res) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          if (res?.status == "Success") {
            handleLink(event.linkUrl, res.user);
          }
        }
      }
    );
    return true;
  }
});