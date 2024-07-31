import { BASE_URL } from "./content";

const testAPI = async (token: string) => {
  try {
    var requestOptions: any = {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const response = await fetch(BASE_URL + "test-route", requestOptions);
    const j = await response.json();
    chrome.action.setBadgeText({ text: "✔" });
    chrome.action.setBadgeTextColor({ color: "#003566" });
    chrome.action.setBadgeBackgroundColor({ color: "white" });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 1000);
    return j;
  } catch (error) {
    return { message: "Internal error occur", status: "Fail" };
  }
};

export default testAPI;
