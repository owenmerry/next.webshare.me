import fetch from 'isomorphic-unfetch';
import Menu from '../../components/Menu';

const CollectionLinks = props => {

return (
    <div>
    <Menu />
      <p>Show Links in Collection ({props.links.length})</p>
      {props.links.map((link, index) => (
        <div key={index}>
            <a href={link.url} target='_blank'>{link.url}</a>
        </div>
      ))}
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