import {useState} from 'react';
import Menu from '../components/Menu';
import { Login } from 'owenmerry-designsystem';
import { postData } from '../helpers/general';
import Router from 'next/router';
import { siteSettings } from '../helpers/settings';

const LoginPage = props => {

    const isLoggedIn = async () => {
        const res = await fetch(siteSettings.apiWebsite +'/api/user/loggedin',{credentials: 'include'});
        const data = await res.json();
        console.log('logged in', data);
      };
      isLoggedIn();

    const [stateError, setStateError] = useState('');

    const loginUser = async (data) => {
        setStateError('');
        const login = await postData(siteSettings.apiWebsite +'/api/user/login', { email: data.email, password: data.password });
        if(login.user.loggedin && login.user.loggedin !== 'error'){
            sessionStorage.loggedin = true;
            Router.push('/links')
        } else {
            setStateError('Sorry those details are not right, please try again.');
        }
    }

return (
    <div>
        <Menu page='login' />
        <Login onLogin={loginUser} errorText={stateError} />
    </div>
  )
};
  
export default LoginPage;