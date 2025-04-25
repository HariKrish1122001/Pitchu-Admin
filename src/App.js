import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './seperate/Dashboard';
import "../src/assets/css/Dashboard.css"
import Login from './seperate/Login';
import Register from './seperate/Register';
import Otp from './seperate/Otp';
import Forgetpassword from './seperate/Forgetpassword';
import ResetPassword from './seperate/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './seperate/404Page';
import ProtectedRoute from './auth/ProtectedRoute';


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/dashboard/domestic" />} /> */}
          <Route exact path="/" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route exact path="/otp" element={<Otp />} />
          <Route exact path="/forgetpassword" element={<Forgetpassword />} />
          <Route exact path="/resetpassword/:Admtoken" element={<ResetPassword />} />
          {/* <Route exact path="/dashboard/domestic" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route exact path="*" element={<PageNotFound />} />

          <Route exact path="/dashboard/domestic" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/dashboard/international" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/dashboard/support" element={<Dashboard />} />
          <Route exact path="/dashboard/plan" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
