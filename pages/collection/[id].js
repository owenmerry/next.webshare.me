import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';
import { FlexGrid, Card, CardList, ProfileTitle } from 'owenmerry-designsystem';

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
    const getData = async () => {
      const res = await fetch(`http://www.webshare.me/api/link/collection/${props.query.id}`);
      const data = await res.json();

      console.log(data);
    
      setData(data);
    }
    
    const setData = (data) => {
    
      const cardList = formatList(data.links);
    
      setStateList(cardList);
      setCollection(data.collection);
      setStateListLoading(false);
    }
    
    getData();
    
    },[]);

// helpers
    const formatList = (data) => {
      console.log(data);
      return data.map((item)=> {
        return {
          title:item.title,
          subtitle:item.description,
          image: item.image,
          link: item.url,
          timestamp: item.created_at,
        }; 
      }); 
    }



return (
    <div>
    <Menu page='collections' />
    <ProfileTitle 
      loading={stateListLoading} 
      title={stateCollection.name} 
      titleTextTop={`Collection`} 
      titleTextBottom={`${stateList.length} Links created by Owen Merry`} 
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

      {/* <FlexGrid>
      {props.links.map((link, index) => (
        <Card 
        key={index}
        image={link.image}
        title={link.title}
        subtitle={link.description} 
        link={link.url}
        linkTarget={true}
        padding
        ></Card>
      ))}
      </FlexGrid> */}
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