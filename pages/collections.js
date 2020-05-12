import { useState, useEffect } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { CardList, ProfileTitle } from 'owenmerry-designsystem';
import { postData, formatListCollections } from '../helpers/general';

const Collections = props => {

//variables
const loadingEmpty = {
  title:'',
  subtitle:'',
}

//state
const [stateListLoading, setStateListLoading] = useState(true);
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);

  useEffect(() => {
    
    getData();
    
    },[]);

    const getData = async () => {
      //const res = await fetch('http://www.webshare.me/api/collection/all');
      const res = await fetch('http://www.webshare.me/api/collection/all');
      const dataCollections = await res.json();

      console.log(dataCollections);
    
      setLinks(dataCollections);
    }
    
    const setLinks = (dataCollections) => {
    
      const cardList = formatListCollections(dataCollections.collections);
    
      setStateList(cardList);
      setStateListLoading(false);
    }

    const refreshCards = async () => {
      const res = await fetch('http://www.webshare.me/api/collection/all');
      const dataCollections = await res.json();

      setLinks(dataCollections);
    }

    const addCollection = async (name) => {
      postData('http://www.webshare.me/api/collection/add', { name: name })
      .then(data => {
        console.log('post data',data); // JSON data parsed by `response.json()` call
        refreshCards();
      });
    }


return (
    <div>
    <Menu page='collections' />
    <ProfileTitle 
      loading={stateListLoading} 
      title='My Collections' 
      titleTextBottom={`${stateList.length} Collections`} 
      />
      <CardList 
          items={stateList}
          cardSettings={{
            shadowLarge: true,
            width: '280px',
            imageHeight: '150px',
            marginBottom: '20px',
          }}
          grid='4'
          loading={stateListLoading}
          addItem={addCollection}
        />

    </div>
  )
};

Collections.getInitialProps = async function() {
    return {
      server: true,
    };
};
  
export default Collections;