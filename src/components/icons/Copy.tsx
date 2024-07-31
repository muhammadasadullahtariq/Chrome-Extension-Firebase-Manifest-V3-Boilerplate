import React from "react";

const Copy: React.FC = () => {
  return (
    <img
      src={chrome.runtime.getURL("/copy.svg")}
      alt="copy"
      className="text-[#e5e7eb]"
      width={22}
    />
  );
};

export default Copy;
