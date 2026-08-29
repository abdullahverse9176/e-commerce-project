import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';

import { LoginPage } from './pages/LoginPage';

interface HealthResponse {
  status: string;
  message: string;
}

export function App() {
  const [backendStatus, setBackendStatus] = useState<'connecting' | 'online' | 'offline'>('connecting');
  const [backendMessage, setBackendMessage] = useState<string>('Connecting to Express backend...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data: HealthResponse) => {
        setBackendStatus('online');
        setBackendMessage(data.message || 'Express backend online');
      })
      .catch(() => {
        setBackendStatus('offline');
        setBackendMessage('Backend offline (Run npm run dev in /backend)');
      });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative">
          <Routes>
            {/* Shared Layout wrapper containing Navbar (Header) & Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>

          {/* Floating Backend Health Status Badge */}
          <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 glass-panel border border-slate-800 px-3.5 py-2 rounded-full shadow-2xl text-xs">
            {backendStatus === 'connecting' && (
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            )}
            {backendStatus === 'online' && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
            {backendStatus === 'offline' && (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className="text-slate-300 font-semibold">{backendMessage}</span>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
