import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePrincipal from './pages/HomePrincipal/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EditarPerfilPaciente from './pages/EditarPaciente/EditarPaciente';
import EditarPerfilProfissional from './pages/EditarProfissional/EditarProfissional';
import HomePaciente from './pages/Paciente/HomePaciente/HomePaciente';
import DiarioPessoal from './pages/Paciente/DiarioPessoal/DiarioPessoal';
import MinhasMetas from './pages/Paciente/MinhasMetas/MinhasMetas';
import RecadosPaciente from './pages/Paciente/RecadosPaciente/RecadosPaciente';
import NotificacaoPaciente from './pages/Paciente/NotificacaoPaciente/NotificacaoPaciente';

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
        <Route path="/diarioPessoalPaciente" element={<DiarioPessoal />} />
        <Route path="/minhasMetasPaciente" element={<MinhasMetas />} />
        <Route path="/recadosPaciente" element={<RecadosPaciente/>} />
        <Route path="/notificacaoPaciente" element={<NotificacaoPaciente/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
