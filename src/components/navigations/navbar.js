import Link from 'next/link'
import { ArrowRight2, Call, HambergerMenu, Logout } from 'iconsax-react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useAuth } from '@/firebase/fire_auth_context';

export default function Navbar() {
    const router = useRouter();
    const { loading, authUser, logOut } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 0) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dashboard = () => {
        if (!loading && authUser) {
            return <>
                {authUser.email === "info@skyinksavings.com" ?
                    <Link className="btn btn-sm btn_secondary mx-1" href="/dashboard/admin">
                        My Account <ArrowRight2 />
                    </Link>
                    : <Link className="btn btn-sm btn_secondary mx-1" href="/dashboard/user">
                        My Account <ArrowRight2 />
                    </Link>

                }
                <button className="btn btn-sm mx-1" role="button" onClick={logOut}>
                    Sign Out <Logout />
                </button>
            </>
        } else {
            return <Link className="btn btn-sm btn_secondary mx-1" href="/auth/login">
                My Account <ArrowRight2 />
            </Link>
        }
    }

    return (
        <nav className={`navbar navbar-expand-md navbar-dark fixed-top ${isScrolled ? "bg_primary" : "trans"}`}>
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <img
                        src="/favicon_trans.png"
                        alt="logo"
                        className="rounded"
                        width={70}
                    />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <HambergerMenu className={isScrolled ? "white" : "primary"} />
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0 px-md-5">
                        <li className="nav-item">
                            <Link className={`nav-link ${router.asPath == "/" ? isScrolled ? "secondary" : "primary" : isScrolled ? "white" : "primary"}`} href="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${router.asPath == "/services" ? isScrolled ? "secondary" : "primary" : isScrolled ? "white" : "primary"}`} href="/services">Personal Banking</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${router.asPath == "/about" ? isScrolled ? "secondary" : "primary" : isScrolled ? "white" : "primary"}`} href="/about">About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${router.asPath == "/contact" ? isScrolled ? "secondary" : "primary" : isScrolled ? "white" : "primary"}`} href="/contact">Contact</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        {dashboard()}

                        <Link className="btn btn-sm btn_secondary mx-1" href="tel:+447418371908">
                            <Call /> +44 (741) 837 1908
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
