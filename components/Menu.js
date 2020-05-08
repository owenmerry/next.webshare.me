import { Header } from 'owenmerry-designsystem';

const Menu = props => (
    <div>
        <style jsx global>{`
            html, body {
                font-family: 'Source Sans Pro', sans-serif;
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
                style: 'background',
                align: 'right',
                items: [
                  {name:'Links',url:'/links',selected: props.page === 'links'},
                  {name:'Collections',url:'/collections',selected: props.page === 'collections'},
                  {name:'Owen Merry',url:'/user/1',selected: props.page === 'profile'},
                ]
              }
        }
            backgroundColor='rgb(32, 32, 192)'
        />
    </div>
);

export default Menu;