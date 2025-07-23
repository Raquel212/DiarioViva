import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePrincipal from './pages/HomePrincipal/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EditarPerfilPaciente from './pages/EditarPaciente/EditarPaciente';

function AppRoutes() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/editarPerfilPaciente" element={<EditarPerfilPaciente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
