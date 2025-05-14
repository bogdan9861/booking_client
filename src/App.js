import { BrowserRouter as Rotuer, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import AdminProfile from "./pages/AdminProfile/AdminProfile";

function App() {
  return (
    <Rotuer>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/admin" Component={AdminProfile} />
      </Routes>
    </Rotuer>
  );
}

export default App;
