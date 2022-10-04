import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// import "./index.css";
// import "./main.scss";

const colors = {
    brand: {
        green: "green.400",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const globalTheme = {
    rounded: "22px"
}

const theme = extendTheme({ colors, globalTheme });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
