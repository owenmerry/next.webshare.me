import Menu from '../components/Menu';
import { Button } from 'owenmerry-designsystem';

const Login = props => {

    const loginUser = () => {
        postData('http://www.webshare.me/api/user/login', { email: 'me@owenmerry.com', password: 'password' })
        .then(data => {
            console.log('post data',data); // JSON data parsed by `response.json()` call
        });
    }

return (
    <div>
    <Menu />
    <ProfileTitle 
      title='Login' 
      />
      <div>
          <Button onClick={loginUser}>Login</Button>
      </div>
    </div>
  )
};
  
export default Login;