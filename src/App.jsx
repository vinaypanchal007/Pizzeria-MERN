import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Menu from './Components/Menu';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Register from './Components/Register';
import Upload from "./AdminPages/Upload";
import OrderList from './Components/OrderList';
import { CartProvider } from './Components/CartContext';
import MyOrders from './Components/MyOrders';
import AdminPanel from './AdminPages/AdminPanel';
import ProtectedRoute from './auth/ProtectedRoute';
import UserCRUD from './AdminPages/UserCRUD';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/About" element={<ProtectedRoute component={About} allowedRoles={['user']}/>} />
            <Route path="/Contact" element={<ProtectedRoute component={Contact} allowedRoles={['user']}/>} />
            <Route path="/OrderList" element={<ProtectedRoute component={OrderList} allowedRoles={['user']}/>} />
            <Route path="/MyOrders" element={<ProtectedRoute component={MyOrders} allowedRoles={['user']}/>} />
            <Route path="/AdminPanel" element={<ProtectedRoute component={AdminPanel} allowedRoles={['admin']}/>} />
            <Route path="/AdminPanel/Upload" element={<ProtectedRoute component={Upload} allowedRoles={['admin']}/>} />
            <Route path="/AdminPanel/Users" element={<ProtectedRoute component={UserCRUD} allowedRoles={['admin']}/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
