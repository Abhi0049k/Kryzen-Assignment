import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';

const Router = () => {
    return (
        <Routes>
            <Route path='/protected' element={<Layout><PrivateRoute><Home/></PrivateRoute></Layout>} />
            <Route path='/login' element={<Layout><Login/></Layout>} />
            <Route path='/register' element={<Layout><Register/></Layout>} />
        </Routes>
    )
}

export default Router;