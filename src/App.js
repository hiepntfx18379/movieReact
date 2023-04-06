import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.scss";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Top_Rate from "./pages/top/Top";
import Tren from "./pages/trendy/Tren";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top_rate" element={<Top_Rate />} />
        <Route path="/trendy" element={<Tren />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
