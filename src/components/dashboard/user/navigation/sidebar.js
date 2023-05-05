import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from '@/components/dashboard/Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faCoins, faWallet, faMoneyBillTransfer, faFile } from '@fortawesome/free-solid-svg-icons'

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
                <li className={router.asPath == "/dashboard/user" ? styles.active : ""}>
                    <Link href="/dashboard/user">
                        <span><FontAwesomeIcon icon={faGauge} /></span>
                        <span className="d-none d-md-block">Dashboard</span>
                    </Link>
                </li>
                {/* <li className={router.asPath == "/dashboard/user/deposit" ? styles.active : ""}>
                    <Link href="/dashboard/user/deposit" >
                        <span><FontAwesomeIcon icon={faCoins} /></span>
                        <span className="d-none d-md-block">Deposit</span>
                    </Link>
                </li> */}
                <li className={router.asPath == "/dashboard/user/withdrawal" ? styles.active : ""}>
                    <Link href="/dashboard/user/withdrawal" >
                        <span><FontAwesomeIcon icon={faMoneyBillTransfer} /></span>
                        <span className="d-none d-md-block">Withdrawal / Transfer</span>
                    </Link>
                </li>
                <li className={router.asPath == "/dashboard/user/upload_id" ? styles.active : ""}>
                    <Link href="/dashboard/user/upload_id" >
                        <span><FontAwesomeIcon icon={faFile} /></span>
                        <span className="d-none d-md-block">Upload ID</span>
                    </Link>
                </li>
                <li className={router.asPath == "/dashboard/user/wallet" ? styles.active : ""}>
                    <Link href="/dashboard/user/wallet" >
                        <span><FontAwesomeIcon icon={faWallet} /></span>
                        <span className="d-none d-md-block">Wallet</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
