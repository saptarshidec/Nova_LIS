import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ScrollContextProvider } from "./store/scroll-context";
import { UserContextProvider } from "./store/user-context";
// import { BookContextProvider } from "./store/book-context";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <ScrollContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </ScrollContextProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
