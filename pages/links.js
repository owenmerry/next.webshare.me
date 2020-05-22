import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { CardList, ProfileTitle, Wrapper, Alert, CardEdit, Button } from 'owenmerry-designsystem';
import { postData, fetchData, formatListLinks, getTopResults, isURL } from '../helpers/general';
import { siteSettings } from '../helpers/settings';

const Links = props => {

//variables
const loadingEmpty = {
  title:'loading',
  subtitle:'loading',
}

//state
const [statePageLoading, setStatePageLoading] = useState(true);
const [stateListLoading, setStateListLoading] = useState(false);
const [stateList, setStateList] = useState([loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty,loadingEmpty]);


const [stateMorePostsLoading, setStateMorePostsLoading] = useState(false);
const [statePage, setStatePage] = useState(false);
const [statePageNum, setStatePageNum] = useState(40);
const [stateStatus, setStateStatus] = useState('');

// pop ups
const [stateEditShow, setStateEditShow] = useState(false);
const [stateEditData, setStateEditData] = useState({});
const [stateCollectionAddShow, setStateCollectionAddShow] = useState(false);
const [stateCollectionAddData, setStateCollectionAddData] = useState({});

  useEffect(() => {
    
    getData();
    
    },[statePageLoading]);


    const getData = async () => {
      const dataLinks = await postData(siteSettings.apiWebsite +'/api/link/mylinks');
    
      setLinks(dataLinks);
    }

    const refreshCards = async () => {
      setStateListLoading(true);
      const dataLinks = await postData(siteSettings.apiWebsite +'/api/link/mylinks');

      console.log('refreshed Data', dataLinks);
    
      setLinks(dataLinks);
      setStateListLoading(false);
    }
    
    const setLinks = (dataLinks) => {
      const cardList = formatListLinks(dataLinks.links.reverse());
    
      setStateList(cardList);
      setStatePageLoading(false);
      setStatePage(dataLinks.links.length >= statePageNum);

    }

    //functions

    const addLink = async (website) => {
      if(isURL(website)) {
        const added = await postData(siteSettings.apiWebsite +'/api/link/add', { website: website });
        if(added.status === 'created'){
          await refreshCards();
          setStateStatus({type: 'success', text: 'Your link was added'});
        }
        if(added.status === 'error'){
          setStateStatus({type: 'error', text: 'Hmm, something seems to have gone wrong with adding that link.'});
        }
        if(added.status === 'existed'){
          setStateStatus({type: 'warning', text: 'This link is already saved in your links'});
        }
      } else { 
        setStateStatus({type: 'error', text: 'Hmm, that link doesn\'t seem to be a valid website address'});
      }
    }

    const getMorePosts = async () => {

      //start loading
      setStateMorePostsLoading(true);
      const dataLinks = await postData(siteSettings.apiWebsite +'/api/link/mylinks');
      const cardList = formatListLinks(getTopResults(dataLinks.links,statePageNum + 40));

      setStateList(cardList);
      setStateMorePostsLoading(false);
      setStatePage(dataLinks.links.length >= statePageNum + 40);
      setStatePageNum(statePageNum + 40);
    };

    const cardMoreMenuClicked = async (data) => {
      if(data.ref === 'edit'){
        cardEditShow(data.id);
      }
      if(data.ref === 'addtocollection'){
        cardCollectionAddShow(data.id);
      }
      if(data.ref === 'refresh'){
        const refreshLink = await fetchData(siteSettings.apiWebsite +'/api/link/refresh/'+ data.id);
        refreshCards();
      }
      if(data.ref === 'delete'){
        const deleteLink = await postData(siteSettings.apiWebsite +'/api/link/delete/'+ data.id,{'_method': 'DELETE'});
        setStateStatus({type: 'success', text: 'Your link was deleted'});
        refreshCards();
      }
    };

    const cardEditShow = async (id) => {
      const getLink = await fetchData(siteSettings.apiWebsite +'/api/link/getlink/'+ id);
      console.log(getLink);
      setStateEditData({
        linkid:getLink.link.id,
        image:getLink.link.image,
        title:getLink.link.title,
        description:getLink.link.description,
        url:getLink.link.url,
        privacy:getLink.link.privacy_id,
      });
      setStateEditShow(true)

    };
    const cardEditSubmit = async (formData) => {
      const updateLink = await postData(siteSettings.apiWebsite +'/api/link/update',{...formData});   
      refreshCards();
      setStateEditShow(false);
      setStateStatus({type: 'success', text: 'Your link was edited successfully'});
    };

    const cardCollectionAddShow = async (id) => {
      const getCollections = await postData(siteSettings.apiWebsite +'/api/collection/mycollections');
      console.log(getCollections);
      setStateCollectionAddData({
        linkid:id,
        collections: getCollections.collections,
      });
      setStateCollectionAddShow(true)
    };
    const cardCollectionAddSubmit = async (formData) => {
      const updateLink = await fetchData(siteSettings.apiWebsite +'/api/link/linktocollection/'+ formData.linkid +'/'+ formData.collectionid);   
      setStateCollectionAddShow(false);
      setStateStatus({type: 'success', text: 'Your link was added to the collection'});
    };





return (
    <div>
    <Menu page='links' loggedin/>
    <ProfileTitle 
      loading={statePageLoading} 
      title='My Links' 
      titleTextBottom={`${stateList.length} Links`} 
      />
      <Wrapper><Alert type={stateStatus.type} text={stateStatus.text} /></Wrapper>
      <CardEdit 
      show={stateEditShow} 
      onPopUpHidden={() => setStateEditShow(false)} 
      onSubmit={cardEditSubmit}
      data={stateEditData}
      />
      <CardEdit 
      show={stateCollectionAddShow} 
      onPopUpHidden={() => setStateCollectionAddShow(false)} 
      onSubmit={cardCollectionAddSubmit}
      data={stateCollectionAddData}
      formType='addtocollection'
      />
      <CardList 
          items={stateList}
          cardSettings={{
            shadowLarge: true,
            imageHeight: '150px',
            linkNewWindow: true,
            moreMenuSettings: {
              items: [
              {name: 'Add to Collection', ref: 'addtocollection', selected: false},
              {name: 'Edit', ref: 'edit', selected: false},
              {name: 'Refresh', ref: 'refresh', selected: false},
              {name: 'Delete', ref: 'delete', selected: false},
              ],
              menuClicked:cardMoreMenuClicked,
            }
          }} 
          grid='4'
          loading={statePageLoading || stateListLoading}
          addItem={addLink}
          addItemPlaceholder='Paste website link here'
          addItemButton='Add Link'
          isLoadMoreLoading={stateMorePostsLoading}
          showLoadMore={false}
          clickLoadMore={getMorePosts}
          loadMoreText='More Links'
          loadMoreTextLoading='Loading...'
          lazyloadShowSubtitle
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