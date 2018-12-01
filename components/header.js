import Link from 'next/link';
import { logout } from '../utils/auth';

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link prefetch href="/"><a>Home</a></Link></li>
                <li><Link href="/login"><a>Login</a></Link></li>
                <li><Link href="/profile"><a>Profile</a></Link></li>
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </nav>
        <style jsx>{`
            ul {
                display: flex;
                list-style: none;
                margin-left: 0;
                padding-left: 0;
            }

            li:first-child {
                margin-left: auto;
            }

            li {
                margin-right: 1em;
            }

            a {
                text-decoration: none;
                color: blue;
            }

            a:hover {
                opacity: .8;
            }
        `}</style>
    </header>
);

export default Header;
