import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import { AuthProvider } from "./context/authContext";
import { FolderProvider } from "./context/folderContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <FolderProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:login" element={<Home />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/:username" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </FolderProvider>
    </AuthProvider>
  );
}

export default App;
