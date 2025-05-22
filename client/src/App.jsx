import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import Profile from "../src/pages/Profile";
import Header from "./components/Header";
import AdminLogin from "./pages/admin-pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
