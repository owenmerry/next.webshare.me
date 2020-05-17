import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { Card, Input, Button, Wrapper, ProfileTitle } from 'owenmerry-designsystem';
import { postData, formatListLinks, getTopResults } from '../helpers/general';
import { siteSettings } from '../helpers/settings';

const Test = props => {

//variables
const loadingEmpty = {
  title:'loading',
  subtitle:'loading',
}

//state
const [stateLoading, setStateLoading] = useState(true);
const [stateWebsite, setStateWebsite] = useState('');
const [stateWebsiteData, setStateWebsiteData] = useState({});

  useEffect(() => {
    setStateLoading(false);
    },[]);


    const getData = async () => {
      const resSite = await fetch(siteSettings.apiWebsite +'/api/link/getdata?website=' + stateWebsite,{credentials: 'include'});
      const dataSite = await resSite.json();
  
      setStateWebsiteData({
        title:dataSite.showtitle,
        subtitle:dataSite.showdescription,
        image: dataSite.showimage,
        link: dataSite.url,
        timestamp: Date.now(),
      });
    }

    const getJSON = () => {
      window.open(siteSettings.apiWebsite +'/api/link/getdata?website=' + stateWebsite);
    };


return stateLoading ? ('Loading...') : (
    <div>
    <Menu page='links' loggedin/>
    <ProfileTitle 
      title='Check Link Data' 
      titleTextTop={`Testing`} 
      />
      <Wrapper>
       <div class='control-show' style={{marginBottom: '20px'}}>
       <Input 
        placeholder='Paste website URL here'
        width='400px'
        value={stateWebsite}
        onChange={(e) => setStateWebsite(e.target.value)}
        inline
        style={{marginRight: '5px'}}
       />
       <span style={{marginRight: '5px'}}>
       <Button 
        onClick={getData}
       >Check Website</Button>
       </span>
      <Button 
        onClick={getJSON}
       >Check JSON</Button>
       </div>
       <div class='card-show'>
      {stateWebsiteData.link && (<Card 
        shadowLarge
        width='280px'
        imageHeight='150px'
        marginBottom='20px'
        linkNewWindow
        {...stateWebsiteData}
      />)}
      </div>
      </Wrapper>
    </div>
  )
};

Test.getInitialProps = async function() {
    return {
      server: true,
    };
};
  
export default Test;