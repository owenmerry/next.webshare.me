import Menu from '../components/Menu';
import { Button, ProfileTitle } from 'owenmerry-designsystem';
import { postData } from '../helpers/general';

const Login = props => {

    const loginUser = async () => {
        postData('http://www.webshare.me/api/user/login', { email: 'me@owenmerry.com', password: 'password' })
        .then(data => {
            console.log('post data',data); // JSON data parsed by `response.json()` call
        });
    }

    const logoutUser = async () => {
        const res = await fetch('http://www.webshare.me/api/user/logout',{credentials: 'include'});
        const data = await res.json();
    }

return (
    <div>
    <Menu />
    <ProfileTitle 
      title='Login' 
      />
      <div>
          <Button onClick={loginUser}>Login</Button>
          <br />
          <br />
          <Button onClick={logoutUser}>Logout</Button>
      </div>
    </div>
  )
};
  
export default Login;