import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Signup from './components/signup'
import Login from './components/Login';
//import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
// import { GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css'
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import { Provider } from 'react-redux'
import store from './redux/store.jsx'



function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
        
      <Routes>
      <Route path="/users" element={<Users />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />

        {/* <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
      </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
