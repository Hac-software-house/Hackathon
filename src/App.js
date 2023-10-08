
import AuthContextProvider from './context/AuthContext';
import './App.scss';
import 'bootstrap/dist/js/bootstrap'
import Routers from './pages/Routes'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <AuthContextProvider>

      <Routers/>

    </AuthContextProvider>
    <ToastContainer />

    </>
  );
}

export default App;
