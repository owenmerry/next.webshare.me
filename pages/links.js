import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { CardList, ProfileTitle } from 'owenmerry-designsystem';
import { postData, formatListLinks, getTopResults } from '../helpers/general';

const Links = props => {

//variables
const loadingEmpty = {
  title:'loading',
  subtitle:'loading',
}

//state
const [statePageLoading, setStatePageLoading] = useState(true);
const [stateListLoading, setStateListLoading] = useState(false);
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);

  useEffect(() => {
    
    getData();
    
    },[statePageLoading]);


    const getData = async () => {
      const res = await fetch('http://www.webshare.me/api/link/user/1');
      const dataLinks = await res.json();
    
      setLinks(dataLinks);
    }

    const refreshCards = async () => {
      setStateListLoading(true);
      //const res = await fetch('http://www.webshare.me/api/link/user/mylinks');
      const res = await fetch('http://www.webshare.me/api/link/user/1');
      const dataLinks = await res.json();

      console.log('refreshed Data', dataLinks);
    
      setLinks(dataLinks);
      setStateListLoading(false);
    }
    
    const setLinks = (dataLinks) => {

      console.log(dataLinks);
    
      const cardList = formatListLinks(getTopResults(dataLinks.links,40));
      //const cardList = formatListLinks(dataLinks.links.reverse());
    
      setStateList(cardList);
      setStatePageLoading(false);
    }

    //functions

    const addLink = async (website) => {
      postData('http://www.webshare.me/api/link/add', { website: website })
      .then(data => {
        console.log('post data',data); // JSON data parsed by `response.json()` call
        refreshCards();
      });
    }





return (
    <div>
    <Menu page='links'/>
    <ProfileTitle 
      loading={statePageLoading} 
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
          loading={statePageLoading || stateListLoading}
          addItem={addLink}
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