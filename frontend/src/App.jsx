import { NavLink, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MedicamentsPage from "./pages/MedicamentsPage";
import VentesPage from "./pages/VentesPage";

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>PharmaManager</h1>
        <nav className="nav-links">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/medicaments">Médicaments</NavLink>
          <NavLink to="/ventes">Ventes</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/medicaments" element={<MedicamentsPage />} />
          <Route path="/ventes" element={<VentesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;