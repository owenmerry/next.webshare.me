import Menu from '../components/Menu';
import { 
  Hero,
  CallToAction,
  Features,
  Pricing,
  Articles,
  Gallery,
 } from 'owenmerry-designsystem';

const Index = props => {

return (
    <div>
      <Menu />
      <Hero 
        title='Save, Collect and Share Your Favourite Websites'
        paragraph='Collect all your online links in one place and share with your friends'
        buttonLabel='Login / Signup Now'
        buttonUrl='/login'
        styleType='light'
      />
    </div>
  )
};
  
export default Index;