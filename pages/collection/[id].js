import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';
import { Button, Card, FlexGrid } from 'owenmerry-designsystem';

const CollectionLinks = props => {

return (
    <div>
    <Menu />
      <p>Show Links in Collection ({props.links.length})</p>
      <FlexGrid>
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
      </FlexGrid>
    </div>
  )
};

CollectionLinks.getInitialProps = async function(props) {
    const res = await fetch(`http://www.webshare.me/api/link/collection/${props.query.id}`);
    const data = await res.json();
  
   // console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      links: data.links,
    };
};
  
export default CollectionLinks;