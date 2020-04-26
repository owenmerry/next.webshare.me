import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import { FlexGrid, Card, CardList } from 'owenmerry-designsystem';

const Links = props => {



return (
    <div>
    <Menu page='links'/>
    <div>Add Link <input type='text' /> <button>Add Link</button></div>
      <p>Show Links ({props.links.length})</p>
here

      <CardList 
          items={props.links}
          cardSettings={{
            shadowLarge: true,
            width: '400px',
            imageHeight: '400px',
            marginBottom: '50px',
          }}
          showLoadMore={false}
        />
{/* 
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
      </FlexGrid> */}
    </div>
  )
};

Links.getInitialProps = async function() {
    const res = await fetch('http://www.webshare.me/api/link/user/1');
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);

    const formatList = (data) => {
      return data.map((item)=> {
        return {
          subtitle:item.name,
          image: item.image,
        }; 
      }); 
    }

    const topResults = [];

    for (var i = 0; i < 40; i++) {
      topResults.push(data.links[i])
    }
  
    return {
      links: topResults,
    };
};
  
export default Links;