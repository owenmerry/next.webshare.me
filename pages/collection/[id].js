import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';
import { FlexGrid, Card, CardList, ProfileTitle } from 'owenmerry-designsystem';
import { formatListLinks, postData } from '../../helpers/general';
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
      await postData(`${siteSettings.apiWebsite}/api/link/add`, { website: website, collection_id: props.query.id });
      refreshCards();
    }


return (
    <div>
    <Menu page='collections' />
    <ProfileTitle 
      loading={stateListLoading} 
      title={stateCollection.name} 
      titleTextTop={`Collection`} 
      titleTextBottom={`${stateList.length} Links in this collection`} 
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
          addItem={addLinkToCollection}
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