import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';
import { CardList, ProfileTitle, Tabs } from 'owenmerry-designsystem';
import { formatListLinksUser, formatListCollectionsUser, getTopResults } from '../../helpers/general';
import { siteSettings } from '../../helpers/settings';

const UserProfile = props => {

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
            imageShow: false,
            marginBottom: '20px',
          }} 
          grid='4'
          loading={stateListLoading}
        />)}
    </div>
  )
};

UserProfile.getInitialProps = async function(props) {
    const resUser = await fetch(`${siteSettings.apiWebsite}/api/user/show/${props.query.user}`);
    const dataUser = await resUser.json();

    const resLinks = await fetch(`${siteSettings.apiWebsite}/api/link/user/${props.query.user}`);
    const dataLinks = await resLinks.json();

    const resCollection = await fetch(`${siteSettings.apiWebsite}/api/collection/user/${props.query.user}`);
    const dataCollection = await resCollection.json();
  
    return {
      serverUser: dataUser,
      serverLinksAll: dataLinks.links,
      serverCollectionsAll: dataCollection.collections,
      serverLinks: formatListLinksUser(dataLinks.links),
      serverCollections: formatListCollectionsUser(dataCollection.collections),
    };
};
  
export default UserProfile;