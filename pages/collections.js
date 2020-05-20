import { useState, useEffect } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { CardList, ProfileTitle, Wrapper,Alert } from 'owenmerry-designsystem';
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
const [stateStatus, setStateStatus] = useState('');

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
      if(name !== '') {
        const added = await postData(siteSettings.apiWebsite +'/api/collection/add', { name: name });
        if(added.status === 'error'){
          setStateStatus('Hmm, something seems to have gone wrong with adding that collection.');
        } else {
          refreshCards();
        }
      } else { 
        setStateStatus('Please write a name for the collection');
      }
    }

    const cardMoreMenuClicked = async (data) => {
      if(data.ref === 'delete'){
        const deleteCollection = await postData(siteSettings.apiWebsite +'/api/collection/delete/'+ data.id,{'_method': 'DELETE'});
        setStateStatus('Your collection was deleted');
        refreshCards();
      }
    };


return (
    <div>
    <Menu page='collections' loggedin/>
    <ProfileTitle 
      loading={stateListLoading} 
      title='My Collections' 
      titleTextBottom={`${stateList.length} Collections`} 
      />
      <Wrapper><Alert type='error' text={stateStatus} /></Wrapper>
      <CardList 
          items={stateList}
          cardSettings={{
            shadowLarge: true,
            imageShow: false,
            moreMenuSettings: {
              items: [
              // {name: 'Add to Collection', ref: 'collection', selected: false},
              // {name: 'Edit', ref: 'edit', selected: false},
              // {name: 'Remove from this Collection', ref: 'collection-remove', selected: false},
              {name: 'Delete', ref: 'delete', selected: false},
              ],
              menuClicked:cardMoreMenuClicked,
            }
          }}
          grid='4'
          loading={stateListLoading}
          addItem={addCollection}
          addItemPlaceholder='Collection Name'
          addItemButton='Add Collection'
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