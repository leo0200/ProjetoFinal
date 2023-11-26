import Rotas from './Routes/routes';
import  AuthProvider  from './Contexts/AuthContext'
import { ToastContainer } from 'react-toastify'





function App() {
  return (
    <AuthProvider>
      <div className='container-fluid'>
        <Rotas />
        <ToastContainer 
        autoClose={5000}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
