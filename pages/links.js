import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { CardList, ProfileTitle, Wrapper, Alert } from 'owenmerry-designsystem';
import { postData, formatListLinks, getTopResults, isURL } from '../helpers/general';
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

      console.log(dataLinks);
    
      //const cardList = formatListLinks(dataLinks.links,statePageNum);
      const cardList = formatListLinks(dataLinks.links.reverse());
    
      setStateList(cardList);
      setStatePageLoading(false);
      setStatePage(dataLinks.links.length >= statePageNum);

    }

    //functions

    const addLink = async (website) => {
      if(isURL(website)) {
        const added = await postData(siteSettings.apiWebsite +'/api/link/add', { website: website });
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





return (
    <div>
    <Menu page='links' loggedin/>
    <ProfileTitle 
      loading={statePageLoading} 
      title='My Links' 
      titleTextBottom={`${stateList.length} Links`} 
      />
      <Wrapper><Alert type='error' text={stateStatus} /></Wrapper>
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
          loading={statePageLoading || stateListLoading}
          addItem={addLink}
          addItemPlaceholder='Paste website link here'
          addItemButton='Add Link'
          isLoadMoreLoading={stateMorePostsLoading}
          showLoadMore={false}
          clickLoadMore={getMorePosts}
          loadMoreText='More Links'
          loadMoreTextLoading='Loading...'
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