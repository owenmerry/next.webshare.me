import { useState, useEffect } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { CardList, ProfileTitle } from 'owenmerry-designsystem';
import { postData, formatListCollections } from '../helpers/general';
import { siteSettings } from '../helpers/settings';

const Collections = props => {

//variables
const loadingEmpty = {
  title:'loading',
}

//state
const [stateListLoading, setStateListLoading] = useState(true);
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);

  useEffect(() => {
    
    getData();
    
    },[]);

    const getData = async () => {
      const dataCollections = await postData(siteSettings.apiWebsite +'/api/collection/mycollections');
    
      setLinks(dataCollections);
    }
    
    const setLinks = (dataCollections) => {
    
      const cardList = formatListCollections(dataCollections.collections);
    
      setStateList(cardList);
      setStateListLoading(false);
    }

    const refreshCards = async () => {
      const dataCollections = await postData(siteSettings.apiWebsite +'/api/collection/mycollections');

      setLinks(dataCollections);
    }

    const addCollection = async (name) => {
      await postData(siteSettings.apiWebsite +'/api/collection/add', { name: name });
      refreshCards();
    }


return (
    <div>
    <Menu page='collections' loggedin/>
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
            imageShow: false,
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