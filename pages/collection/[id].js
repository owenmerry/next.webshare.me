import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';
import { Wrapper,Alert, CardList, ProfileTitle } from 'owenmerry-designsystem';
import { formatListLinks, postData, isURL } from '../../helpers/general';
import { siteSettings } from '../../helpers/settings';

const CollectionLinks = props => {
//variables
const loadingEmpty = {
  title:'loading',
  subtitle:'loading',
}

//state
const [stateListLoading, setStateListLoading] = useState(true);
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);
const [stateCollection, setCollection] = useState({});
const [stateStatus, setStateStatus] = useState('');

  useEffect(() => {
      getData();
    },[]);


    const getData = async () => {
      const res = await fetch(`${siteSettings.apiWebsite}/api/link/collection/${props.query.id}`);
      const data = await res.json();
    
      setData(data);
    }
    
    const setData = (data) => {
    
      const cardList = formatListLinks(data.links);
    
      setStateList(cardList);
      setCollection(data.collection);
      setStateListLoading(false);
    }

    const refreshCards = async () => {
      const res = await fetch(`${siteSettings.apiWebsite}/api/link/collection/${props.query.id}`);
      const data = await res.json();
    
      setData(data);
    }

    const addLinkToCollection = async (website) => {
      if(isURL(website)) {
        const added = await postData(`${siteSettings.apiWebsite}/api/link/add`, { website: website, collection_id: props.query.id });
        if(added.status === 'created'){refreshCards();}
        if(added.status === 'error'){
          setStateStatus('Hmm, something seems to have gone wrong with adding that link.');
        }
        if(added.status === 'existed'){
          setStateStatus('This link is already saved in your links');
        }
      } else { 
        setStateStatus('Hmm, that link doesn\'t seem to be a valid website address');
      }
    }

    const cardMoreMenuClicked = async (data) => {
      if(data.ref === 'remove'){
        const deleteLink = await postData(siteSettings.apiWebsite +'/api/collection/delete/'+ props.query.id +'/'+ data.id,{'_method': 'DELETE'});
        setStateStatus('Your link was removed from this collection');
        refreshCards();
      }
      if(data.ref === 'delete'){
        const deleteLink = await postData(siteSettings.apiWebsite +'/api/link/delete/'+ data.id,{'_method': 'DELETE'});
        setStateStatus('Your link was deleted');
        refreshCards();
      }
    };


return (
    <div>
    <Menu page='collections' />
    <ProfileTitle 
      loading={stateListLoading} 
      title={stateCollection.name} 
      titleTextTop={`Collection`} 
      titleTextBottom={`${stateList.length} Links in this collection`} 
      />
      <Wrapper><Alert type='error' text={stateStatus} /></Wrapper>
      <CardList 
          items={stateList}
          cardSettings={{
            shadowLarge: true,
            imageHeight: '150px',
            linkNewWindow: true,
            moreMenuSettings: {
              items: [
              // {name: 'Add to Collection', ref: 'collection', selected: false},
              // {name: 'Edit', ref: 'edit', selected: false},
              // {name: 'Remove from this Collection', ref: 'collection-remove', selected: false},
              {name: 'Remove From Collection', ref: 'remove', selected: false},
              {name: 'Delete', ref: 'delete', selected: false},
              ],
              menuClicked:cardMoreMenuClicked,
            }
          }} 
          grid='4'
          loading={stateListLoading}
          addItem={addLinkToCollection}
          addItemPlaceholder='Paste website link here'
          addItemButton='Add Link'
          lazyloadShowSubtitle
        />
    </div>
  )
};

CollectionLinks.getInitialProps = async function(props) {
    // const res = await fetch(`http://www.webshare.me/api/link/collection/${props.query.id}`);
    // const data = await res.json();
  
   // console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      server: true,
      query: props.query,
      // links: data.links,
    };
};
  
export default CollectionLinks;