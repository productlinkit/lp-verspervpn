import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// No <StrictMode>: it mounts effects twice in development, and the page script
// binds its listeners straight onto the DOM.
createRoot(document.getElementById('root')).render(<App />);
