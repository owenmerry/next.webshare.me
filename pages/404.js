import Menu from '../components/Menu';
import { Hero } from 'owenmerry-designsystem';

const Custom404= props => {

return (
    <div>
    <Menu />
    <Hero 
      title='Error 404'
      paragraph='Seems something has gone wrong '
      buttonLabel='Go back to home'
      buttonUrl='/'
      styleType='light'
    />
    </div>
  )
};
  
export default Custom404;