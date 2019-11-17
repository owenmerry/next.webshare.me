import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { FlexGrid, Card } from 'owenmerry-designsystem';

const Links = props => {

return (
    <div>
    <Menu />
      <p>Show Links ({props.links.length})</p>
      <FlexGrid>
        {props.links.slice(0,5).map((link, index) => (
          <Card 
          key={index}
          title={link.title}
          subtitle={link.description} 
          link={link.url}
          linkTarget={true}
          padding 
          ></Card>
        ))}
      </FlexGrid>
    </div>
  )
};

Links.getInitialProps = async function() {
    const res = await fetch('http://www.webshare.me/api/link/user/1');
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      links: data.links,
    };
};
  
export default Links;