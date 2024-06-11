import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administricao/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurante from "./paginas/Administricao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administricao/PaginaBaseAdmin";
import AdministracaoPratos from "./paginas/Administricao/Pratos/AdministracaoPratos";
import FormularioPrato from "./paginas/Administricao/Pratos/FormularioPrato";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
