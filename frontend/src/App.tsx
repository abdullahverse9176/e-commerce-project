import { useEffect, useState } from 'react';
import './index.css';

interface HealthResponse {
  status: string;
  message: string;
}

export function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Connecting to Express backend...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data: HealthResponse) => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend server is not reachable yet. Start backend server using npm run dev in /backend'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>React + Express (TypeScript) Project</h1>
      <p style={{ color: '#4caf50', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Frontend React (TS) is ready!
      </p>
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
        <h3>Backend Status:</h3>
        <p>{backendStatus}</p>
      </div>
    </div>
  );
}

export default App;
