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

const keepAliveService = () => {
  const endpoint =
    "https://bd3b73b5-b360-4c52-b210-5519f6919d65-dev.e1-us-east-azure.choreoapis.dev/testgeronimo/geronimo-v1-1/v1.0/";
  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        console.log("Keep-alive-service request successful.");
      } else {
        console.error("Keep-alive request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during keep-alive request:", error);
    });
};

// Start the keep-alive interval (every 4 minutes)
setInterval(keepAlive, 1 * 60 * 1000);
setInterval(keepAliveService, 2 * 60 * 1000);

root.render(
  <React.StrictMode>
    <ContactUsForm />
  </React.StrictMode>
);

reportWebVitals();
