var creating;
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
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: "reason for needing the document",
    });
    await creating;
    creating = null;
  }
}

export const parseCustomToken = async (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (tab.status === "complete") {
    const url = new URL(tab.url);
    if (url.origin === "http://localhost:3002") {
      const params = new URL(url.href).searchParams;
      const idToken = params.get("idToken");
      if (!(await hasOffscreenDocument())) {
        await setupOffscreenDocument();
      }
      chrome.runtime.sendMessage({
        action: "loginWithCustomToken",
        idToken: idToken,
      });
      if (idToken) {
        if (tab.id) {
          await chrome.tabs.remove(tab.id);
        }
        chrome.tabs.onUpdated.removeListener(parseCustomToken);
      }
    }
  }
};
