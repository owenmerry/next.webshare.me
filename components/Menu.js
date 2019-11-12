import Link from 'next/link';

const Menu = props => (
    <div>
        <Link href="/" as={`/`}>
            <a>Home</a>
        </Link>
        <span> - </span>
        <Link href="/links" as={`/links`}>
            <a>Links</a>
        </Link>
        <span> - </span>
        <Link href="/collections" as={`/collections`}>
            <a>Collections</a>
        </Link>
    </div>
);

export default Menu;