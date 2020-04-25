import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { FlexGrid, Card } from 'owenmerry-designsystem';

const Links = props => {

return (
    <div>
    <Menu />
    <div>Add Link <input type='text' /> <button>Add Link</button></div>
      <p>Show Links ({props.links.length})</p>
      <FlexGrid>
        {props.links.reverse().slice(0,100).map((link, index) => (
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

Links.getInitialProps = async function() {
    const res = await fetch('http://www.webshare.me/api/link/user/1');
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      links: data.links,
    };
};
  
export default Links;