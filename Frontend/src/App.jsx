import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEditSubscription from "./pages/AddSubscription";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";

// Components
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

// Layout wrapper for protected pages
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </>
  );
};

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddEditSubscription />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <AddEditSubscription />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
