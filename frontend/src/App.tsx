import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';

import { LoginPage } from './pages/LoginPage';

export function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
