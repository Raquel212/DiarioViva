import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePrincipal from './pages/HomePrincipal/Home';
import Login from './pages/Login/Login';
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer'; 
import Cadastro from './pages/Cadastro/Cadastro.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />   
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default AppRoutes;
