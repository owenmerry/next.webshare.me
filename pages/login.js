import {useState} from 'react';
import Menu from '../components/Menu';
import { Login } from 'owenmerry-designsystem';
import { postData } from '../helpers/general';
import Router from 'next/router';
import { siteSettings } from '../helpers/settings';

const LoginPage = props => {

    // state
    const [stateError, setStateError] = useState('');

    // functions
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
    const googleSignedIn = async (profile) => {
        console.log('Google sign in', profile);
        const login = await postData(siteSettings.apiWebsite +'/api/user/login/google', { token: profile.token || profile.credential });
        if(login.user && login.user.loggedin && login.user.loggedin !== 'error'){
            sessionStorage.loggedin = true;
            Router.push('/links')
        } else {
            setStateError('Hmm, something has gone wrong with Google login.');
        }
    };

return (
    <div>
        <Menu page='login' />
        <Login 
            onLogin={loginUser} 
            errorText={stateError}
            showGoogleSignIn={true}
            onGoogleLogin={googleSignedIn}
            googleClientId='996626440039-fdpi7ih8ec210tan3i29kuncqfv2ccqv.apps.googleusercontent.com'
        />
    </div>
  )
};
  
export default LoginPage;