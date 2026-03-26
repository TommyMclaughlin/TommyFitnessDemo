import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import CheckIn from './pages/CheckIn';
import Account from './pages/Account';
import ScrollToTop from './components/ScrollToTop';
import { useLocation } from 'react-router-dom';


function AppContent() {
  const location = useLocation();
  const isCheckInPage = location.pathname === '/check-in';

  return (
    <div className="app">
      <ScrollToTop />
      {!isCheckInPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership-online-store" element={<Membership />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      {!isCheckInPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
