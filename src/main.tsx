import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./lib/styles/reset.css";

createRoot(document.getElementById("root")!).render(<App />);
