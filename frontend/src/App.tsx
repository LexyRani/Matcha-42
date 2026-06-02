
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from './pages/auth/Login';
import {Register} from './pages/auth/Register';
import { Layout } from "./components/layout/Layout";
import { Password } from "./pages/auth/ForgotPassword";
import { Reset } from "./pages/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/register" element={<Register/>}/>
            <Route path="/auth/forgotpassword" element={<Password/>}/>
            <Route path="/auth/resetpassword" element={<Reset/>}/>
          </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
