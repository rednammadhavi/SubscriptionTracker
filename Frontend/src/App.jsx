import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import AddEditSubscription from "./pages/AddEditSubscription";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Trash from "./pages/Trash";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddEditSubscription />} />
          <Route path="/edit/:id" element={<AddEditSubscription isEdit />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toast />
    </Router>
  );
}
