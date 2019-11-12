import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';

const Links = props => {

return (
    <div>
    <Menu />
      <p>Show Links ({props.links.length})</p>
      {props.links.map((link, index) => (
        <div key={index}>
            <a href={link.url} target='_blank'>{link.url}</a>
        </div>
      ))}
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