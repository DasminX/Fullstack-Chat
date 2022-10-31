import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { ChatContextProvider } from "./context/chat-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </ChakraProvider>
);
