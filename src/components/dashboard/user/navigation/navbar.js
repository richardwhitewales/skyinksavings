import Link from 'next/link'
import { useRouter } from "next/router";
import { useAuth } from '@/firebase/fire_auth_context';
import styles from '@/components/dashboard/Navigation.module.css'

export default function Navbar() {
    const { logOut } = useAuth();
    const router = useRouter();

    return (
        <nav className={`${styles.navbar} border-bottom fixed-top`}>
            <div className="container-fluid">
                <div className="d-flex justify-content-between">
                    <div className="navbar-brand navbar-nav me-auto mb-2 mb-md-0">
                        <li className={`nav-item ${styles.nav_item}`}>
                            <p className={`nav-link ${styles.nav_link}`}>
                                {
                                    router.asPath == "/dashboard/user/deposit" ? "Deposit" :
                                        router.asPath == "/dashboard/user/withdrawal" ? "Withdrawal" :
                                            router.asPath == "/dashboard/user/wallet" ? "Wallet" : "Dashboard"
                                }
                            </p>
                        </li>
                    </div>

                    <div className="dropstart">
                        <button className={styles.profile} type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link href="/dashboard/user/wallet" className="dropdown-item">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logOut} className="dropdown-item">Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
