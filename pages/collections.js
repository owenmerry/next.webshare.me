import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import Link from 'next/link';
import { FlexGrid, Card, CardList } from 'owenmerry-designsystem';

const Collections = props => {

  const formatList = (data) => {
    return data.map((item)=> {
      return {
        subtitle:item.name,
      }; 
    }); 
  }

return (
    <div>
    <Menu page='collections' />
      <p>Show Collections ({props.collections.length})</p>
      <CardList 
          items={formatList(props.collections)}
          cardSettings={{
            shadowLarge: true,
            width: '400px',
            imageHeight: '400px',
            marginBottom: '50px',
          }}
          showLoadMore={false}
        />

{/* <FlexGrid>

{props.collections.map((collection, index) => (
  <Link href="/collection/[id]" as={`/collection/${collection.id}`}>
  <div>
    <Card 
    key={index}
    title={collection.name}
    hideLink
    padding
    ></Card>
    </div>
  </Link>
  ))}
</FlexGrid> */}


    </div>
  )
};

Collections.getInitialProps = async function() {
    const res = await fetch('http://www.webshare.me/api/collection/all');
    const data = await res.json();
  
   // console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      collections: data.collections,
    };
};
  
export default Collections;