import Menu from '../components/Menu';
import { Button, Hero } from 'owenmerry-designsystem';

const Index = props => {

return (
    <div>
    <Menu />
    <Hero 
      title='The Desert'
      paragraph='A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.'
      buttonLabel='Join Now'
    />
    </div>
  )
};
  
export default Index;