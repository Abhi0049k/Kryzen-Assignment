import {useDispatch} from 'react-redux';
import { LOGIN_SUCCESS } from '../redux/actionTypes';

const Layout = ({children})=>{
    const dispatch = useDispatch();
    const cookies = document.cookie.split('; ');
    const targetCookie = cookies.find((cookie)=>{
        const [name, value] = cookie.trim().split('=');
        return name==='token'
    })
    if(targetCookie)
    dispatch({type: LOGIN_SUCCESS, payload: targetCookie.split('=')[1]})
    return (
        children
    )
}

export default Layout