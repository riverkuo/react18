import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter basename="/test-react-app">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<h1>test</h1>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
