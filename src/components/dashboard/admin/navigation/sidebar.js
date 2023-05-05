import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from '@/components/dashboard/Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faWallet, faUserAlt, faFile } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
    const router = useRouter();

    return (
        <div className={`${styles.sidebar} fixed-top`}>
            <div className={` ${styles.header}`}>
                <div className="d-none d-md-block">
                    <Link href="/dashboard/user">
                        <Image
                            src="/favicon.png"
                            alt="logo"
                            width={80}
                            height={80}
                            priority
                        />
                    </Link>
                </div>

            </div>
            <ul className={`list-unstyled ${styles.nav}`}>
                <li className={router.asPath == "/dashboard/admin" ? styles.active : ""}>
                    <Link href="/dashboard/admin">
                        <span><FontAwesomeIcon icon={faGauge} /></span>
                        <span className="d-none d-md-block">Dashboard</span>
                    </Link>
                </li>
                <li className={router.asPath == "/dashboard/admin/users" ? styles.active : ""}>
                    <Link href="/dashboard/admin/users" >
                        <span><FontAwesomeIcon icon={faUserAlt} /></span>
                        <span className="d-none d-md-block">Users</span>
                    </Link>
                </li>
                <li className={router.asPath == "/dashboard/admin/doc_upload" ? styles.active : ""}>
                    <Link href="/dashboard/admin/doc_upload" >
                        <span><FontAwesomeIcon icon={faFile} /></span>
                        <span className="d-none d-md-block">Doc Upload</span>
                    </Link>
                </li>
                {/* <li className={router.asPath == "/dashboard/admin/admin" ? styles.active : ""}>
                    <Link href="/dashboard/admin/admin" >
                        <span><FontAwesomeIcon icon={faWallet} /></span>
                        <span className="d-none d-md-block">Admin</span>
                    </Link>
                </li> */}
            </ul>
        </div>
    )
}
