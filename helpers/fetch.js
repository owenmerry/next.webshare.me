const isLoggedIn = async () => {
    const res = await fetch('http://www.webshare.me/api/user/loggedin',{credentials: 'include'});
    const data = await res.json();
    console.log('logged in', data);

    setStateLogin(data.loggedin ? 'true' : 'false');
  }


  // const tryLogin = async () => {

  //   postData('http://www.webshare.me/api/user/login', { email: 'me@owenmerry.com', password: 'password' })
  //   .then(data => {
  //     console.log('post data',data); // JSON data parsed by `response.json()` call
  //   });


  //   setStateLogin('tryed');
  // }

  // const tryLogout = async () => {

  //   const res = await fetch('http://www.webshare.me/api/user/logout',{credentials: 'include'});
  //   const data = await res.json();


  //   setStateLogin('logout');
  // }