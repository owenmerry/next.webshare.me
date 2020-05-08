import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';
import { FlexGrid, Card, CardList, ProfileTitle, Tabs } from 'owenmerry-designsystem';

const UserProfile = props => {

    console.log(props);

// state
const [stateListLoading, setStateListLoading] = useState(false);
const [stateLinkList, setStateLinkList] = useState(props.serverLinks);
const [stateCollectionList, setStateCollectionList] = useState(props.serverCollections);
const [stateUser, setStateUser] = useState(props.serverUser.user);
const [stateTab, setStateTab] = useState('links');

// functions
const tabClicked = (name) => {
    setStateTab(name);
}

return (
    <div>
    <Menu page='profile' />
    <ProfileTitle 
      loading={stateListLoading} 
      title={stateUser.name}
      titleTextTop={`User`} 
      titleTextBottom={`${props.serverLinksAll.length} Links | ${stateCollectionList.length} Collections`} 
      />
    <Tabs
        items={[
            {text:'Links', name:'links'},
            {text:'Collections', name:'collections'},
        ]}
        active={stateTab}
        tabClicked={tabClicked}
    ></Tabs>
    {stateTab === 'links' && (<CardList 
        items={stateLinkList}
        cardSettings={{
        shadowLarge: true,
        width: '300px',
        imageHeight: '150px',
        marginBottom: '20px',
        linkNewWindow: true,
        }} 
        grid={4}
        loading={stateListLoading}
    />)}
    {stateTab === 'collections' && (<CardList 
          items={stateCollectionList}
          cardSettings={{
            shadowLarge: true,
            width: '300px',
            imageHeight: '150px',
            marginBottom: '20px',
          }} 
          grid='4'
          loading={stateListLoading}
        />)}
    </div>
  )
};

UserProfile.getInitialProps = async function(props) {
    const resUser = await fetch(`http://webshare.me/api/user/show/${props.query.user}`);
    const dataUser = await resUser.json();

    const resLinks = await fetch(`http://webshare.me/api/link/user/${props.query.user}`);
    const dataLinks = await resLinks.json();

    const resCollection = await fetch(`http://webshare.me/api/collection/user/${props.query.user}`);
    const dataCollection = await resCollection.json();

   //helpers
   const formatListLink = (data) => {
    return data.map((item)=> {
      return !!item ? {
        title:item.title,
        subtitle:item.description,
        image: item.image,
        link: item.url,
        timestamp: item.created_at,
      } : {}; 
    }); 
  }

  const formatListCollection = (data) => {
    return data.map((item)=> {
      return !!item ? {
        title:item.name,
        image: item.image,
        link: `/collection/${item.id}`,
        timestamp: item.created_at,
      } : {}; 
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
  
    return {
      serverUser: dataUser,
      serverLinksAll: dataLinks.links,
      serverCollectionsAll: dataCollection.collections,
      serverLinks: formatListLink(getTopResults(dataLinks.links,20)),
      serverCollections: formatListCollection(dataCollection.collections),
    };
};
  
export default UserProfile;