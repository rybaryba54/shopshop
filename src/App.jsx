import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Home } from './pages/Home/Home';
import { Item } from './pages/ItemPage/Item';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="min-h-full flex flex-col mx-6">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/items/:id" element={<Item />} />
          <Route path="/dashboard" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
