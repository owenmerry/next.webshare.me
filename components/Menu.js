import { Header } from 'owenmerry-designsystem';

const Menu = props => (
    <div>
        <style jsx global>{`
            html, body {
                font-family: 'Arial';
                margin:0px;
                padding:0px;
                }
            `}
            </style>
        <Header 
            logoURL='/webshare-logo.svg'
            backgroundColor='transparent'
            menuSettings={
              {
                align: 'right',
                items: [
                  {name:'Links',url:'/links',selected: props.page === 'link'},
                  {name:'Collections',url:'/collections',selected: props.page === 'collection'},
                ]
              }
        }
            backgroundColor='rgb(32, 32, 192)'
        />
    </div>
);

export default Menu;