import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePrincipal from './pages/HomePrincipal/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EditarPerfilPaciente from './pages/EditarPaciente/EditarPaciente';
import EditarPerfilProfissional from './pages/EditarProfissional/EditarProfissional';
import HomePaciente from './pages/Paciente/HomePaciente/HomePaciente';

function AppRoutes() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/editarPerfilPaciente" element={<EditarPerfilPaciente />} />
        <Route path="/editarPerfilProfissional" element={<EditarPerfilProfissional />} />
        <Route path="/homePaciente" element={<HomePaciente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
