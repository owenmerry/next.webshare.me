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
            logoURL='/webshare-logo-blue.svg'
            shadow
            menuSettings={
              {
                light: true,
                align: 'right',
                items: [
                  {name:'My Links',url:'/links',selected: props.page === 'links'},
                  {name:'My Collections',url:'/collections',selected: props.page === 'collections'},
                 // {name:'Owen Merry',url:'/user/1',selected: props.page === 'profile'},
                  {name:'Login / Signup',url:'/login',selected: props.page === 'login'},
                 // {name:'Signup',url:'/signup',selected: props.page === 'signup'},
                ]
              }
            }
            backgroundColor='white'
        />
    </div>
);

export default Menu;