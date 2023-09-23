import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/Mainpage";

const Layout = () => {
  return (
    <div>
      <Outlet />
      {/* outlet부분에 child component rendering 
      여기선 outlet 다른 nav comp등이 없기에 굳이 필요 X*/}
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
