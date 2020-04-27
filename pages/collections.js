import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import Link from 'next/link';
import { FlexGrid, Card, CardList } from 'owenmerry-designsystem';

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
    const getData = async () => {
      const res = await fetch('http://www.webshare.me/api/collection/all');
      const dataCollections = await res.json();

      console.log(dataCollections);
    
      setLinks(dataCollections);
    }
    
    const setLinks = (dataCollections) => {
    
      const cardList = formatList(getTopResults(dataCollections.collections,40));
    
      setStateList(cardList);
      setStateListLoading(false);
    }
    
    getData();
    
    },[]);

// helpers
    const formatList = (data) => {
      console.log(data);
      return data.map((item)=> {
        return {
          title:item.name,
          image: item.image,
          timestamp: item.created_at,
        }; 
      }); 
    }

    const getTopResults = (data,amount) => {
      const dataTop = [];
      const dataOrdered = data;
      for (var i = 0; i < amount; i++) {
        dataTop.push(dataOrdered[i])
      }

      return dataTop;
    }

return (
    <div>
    <Menu page='collections' />
      <CardList 
          items={stateList}
          cardSettings={{
            shadowLarge: true,
            width: '400px',
            imageHeight: '300px',
            marginBottom: '50px',
          }}
          loading={stateListLoading}
        />

    </div>
  )
};

Collections.getInitialProps = async function() {
    return {
    };
};
  
export default Collections;