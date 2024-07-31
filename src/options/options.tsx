import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./options.css";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  // const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  console.log("testing done");

  return (
    <div>
      <h1>OPtion page</h1>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
