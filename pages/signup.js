import { useState } from 'react';
import Menu from '../components/Menu';
import { postData } from '../helpers/general';
import { Signup } from 'owenmerry-designsystem';
import Router from 'next/router';
import { siteSettings } from '../helpers/settings';


const SignupPage = props => {

  const [stateError, setStateError] = useState('');

  const SignupUser = async (data) => {
    setStateError('');
    const signup = await postData(siteSettings.apiWebsite +'/api/user/signup', { name: data.name, email: data.email, password: data.password });
    console.log('sign up data', signup);
    if(signup.user.loggedin){
        Router.push('/links')
    } else {
        setStateError('Sorry those details are not right, please try again.');
    }
}

return (
    <div>
    <Menu page='signup'/>
    <Signup onSignup={SignupUser} errorText={stateError} />
    </div>
  )
};
  
export default SignupPage;