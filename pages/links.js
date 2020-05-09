import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { FlexGrid, Card, CardList, ProfileTitle } from 'owenmerry-designsystem';

const Links = props => {

//variables
const loadingEmpty = {
  title:'loading',
  subtitle:'loading',
}

//state
const [stateListLoading, setStateListLoading] = useState(true);
const [stateMorePostsLoading, setStateMorePostsLoading] = useState(false);
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);
const [statePage, setStatePage] = useState({});
const [stateLogin, setStateLogin] = useState('false');

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://www.webshare.me/api/link/user/1');
      const dataLinks = await res.json();
    
      setLinks(dataLinks);
    }
    
    const setLinks = (dataLinks) => {
    
      //const cardList = formatList(getTopResults(dataLinks.links,40));
      const cardList = formatList(dataLinks.links.reverse());
    
      setStateList(cardList);
      setStateListLoading(false);
    }
    
    getData();
    
    },[]);

// helpers
    const formatList = (data) => {
      return data.map((item)=> {
        return {
          title:item.title,
          subtitle:item.description,
          //image: item.image,
          link: item.url,
          timestamp: item.created_at,
        }; 
      }); 
    }

    const getTopResults = (data,amount) => {
      const dataTop = [];
      const dataOrdered = data.reverse();
      for (var i = 0; i < amount; i++) {
        dataTop.push(dataOrdered[i])
      }

      return dataTop;
    }

    const postData = async (url = '', data = {}) => {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    //functions

    const isLoggedIn = async () => {
      const res = await fetch('http://www.webshare.me/api/user/loggedin',{credentials: 'include'});
      const data = await res.json();
      console.log('logged in', data);

      setStateLogin(data.loggedin ? 'true' : 'false');
    }


    const tryLogin = async () => {

      postData('http://www.webshare.me/api/user/login', { email: 'me@owenmerry.com', password: 'password' })
      .then(data => {
        console.log('post data',data); // JSON data parsed by `response.json()` call
      });


      setStateLogin('tryed');
    }

    const tryLogout = async () => {

      const res = await fetch('http://www.webshare.me/api/user/logout',{credentials: 'include'});
      const data = await res.json();


      setStateLogin('logout');
    }

    const addLink = async () => {

      postData('http://www.webshare.me/api/link/add', { email: 'me@owenmerry.com', password: 'password' })
      .then(data => {
        console.log('post data',data); // JSON data parsed by `response.json()` call
      });


      setStateLogin('add link');
    }





return (
    <div>
    <Menu page='links'/>
    <ProfileTitle 
      loading={stateListLoading} 
      title='My Links' 
      titleTextBottom={`${stateList.length} Links`} 
      />
      <CardList 
          items={stateList}
          cardSettings={{
            shadowLarge: true,
            width: '280px',
            imageHeight: '150px',
            marginBottom: '20px',
            linkNewWindow: true,
          }} 
          grid='4'
          loading={stateListLoading}
        />
    </div>
  )
};

Links.getInitialProps = async function() {

  
    return {
      server: true,
    };
};
  
export default Links;