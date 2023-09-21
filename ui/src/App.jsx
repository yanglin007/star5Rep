import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";;
// import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.less"
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/signin" element={
          <SigninPage />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
