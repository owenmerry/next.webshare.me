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
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);
const [statePage, setStatePage] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://www.webshare.me/api/link/user/1');
      const dataLinks = await res.json();

      console.log(dataLinks);
    
      setLinks(dataLinks);
    }
    
    const setLinks = (dataLinks) => {
    
      const cardList = formatList(getTopResults(dataLinks.links,40));
    
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
          title:item.title,
          subtitle:item.description,
          image: item.image,
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
            width: '400px',
            imageHeight: '200px',
            marginBottom: '50px',
            linkNewWindow: true,
          }} 
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