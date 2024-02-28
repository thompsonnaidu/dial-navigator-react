import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthProvider from "./contexts/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard.page";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import LoginPage from "./pages/login/Login.page";
import SignUpPage from "./pages/sign-up/SignUpPage";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Header/>
       
          <div >
            <Routes>
              <Route exact path="/signup" element={<SignUpPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPasswordPage />}
              />
              <Route path="/client" element={<PrivateRoute />}>
                <Route exact path="/client/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/therapist" element={<PrivateRoute />}>
                <Route exact path="/therapist/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
