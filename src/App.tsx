import AppRoutes from './routes/AppRoutes';

import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Employees</h1>
        <AppRoutes />
      </header>
    </div>
  );
}

export default App;
