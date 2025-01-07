import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContactUsForm from "./components/contact-us-forum";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Function to send a periodic keep-alive request
const keepAlive = () => {
  const endpoint =
    "https://b0092292-5b26-440d-b38a-6185403c3d9e.e1-us-east-azure.choreoapps.dev/";
  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        console.log("Keep-alive request successful.");
      } else {
        console.error("Keep-alive request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during keep-alive request:", error);
    });
};

// Start the keep-alive interval (every 4 minutes)
setInterval(keepAlive, 3 * 60 * 1000); // 4 minutes

root.render(
  <React.StrictMode>
    <ContactUsForm />
  </React.StrictMode>
);

reportWebVitals();
