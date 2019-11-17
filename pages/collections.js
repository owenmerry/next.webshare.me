import fetch from 'isomorphic-unfetch';
import Menu from '../components/Menu';
import Link from 'next/link';
import { FlexGrid, Card } from 'owenmerry-designsystem';

const Collections = props => {

return (
    <div>
    <Menu />
      <p>Show Collections ({props.collections.length})</p>
      <FlexGrid>
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
      </FlexGrid>
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