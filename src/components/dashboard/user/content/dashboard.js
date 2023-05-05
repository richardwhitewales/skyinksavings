import Link from 'next/link'
import styles from '@/components/dashboard/Content.module.css'
import { toCurrency } from '@/components/utils/toCurrency'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc } from 'firebase/firestore';
import Chart from '@/components/dashboard/chart'

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const profileRef = doc(db, 'users', user.email);
            getDoc(profileRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setUser(docSnapshot.data());
                    } else {
                        console.log('Profile not found');
                    }
                })
                .catch((error) => {
                    console.log('Error getting profile:', error);
                });
        }
    }, []);

    if (!user) {
        return <div className={styles.process} />
    }

    return (
        <div className={styles.content}>
            <div className={styles.greeting}>
                Greetings,  {user.firstName}
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <div className={`mr-2 mb-2 ${styles.balanceCard} shadow`}>
                        <span className={styles.title}>
                            Total Balance
                        </span>
                        <span className={styles.balance}>
                            {toCurrency(user.dashboard.balance)}
                        </span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`mr-2 mb-2 ${styles.balanceCard} bg_secondary shadow`}>
                        <span className={`${styles.title} bg_white secondary`}>
                            Deposit
                        </span>
                        <span className={`${styles.balance} white`}>
                            {toCurrency(user.dashboard.deposit)}
                        </span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`mr-2 mb-2 ${styles.balanceCard} bg_primary shadow`}>
                        <span className={`${styles.title} bg_white primary`}>
                            Withdraw
                        </span>
                        <span className={`${styles.balance} white`}>
                            {toCurrency(user.dashboard.withdraw)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <div className={`mr-2 mb-2 ${styles.wallet} shadow`}>
                        <div className={styles.header}>
                            Wallet
                        </div>
                        <ul className={`list-unstyled mt-3 ${styles.body}`}>
                            <li>
                                <p className="fw-bold">Withdrawal</p>
                                <span className="primary">
                                    {toCurrency(user.dashboard.withdraw)}
                                </span>
                            </li>
                            <li>
                                <p className="fw-bold">Deposit</p>
                                <span className="primary">
                                    {toCurrency(user.dashboard.deposit)}
                                </span>
                            </li>
                        </ul>

                        <ul className={`list-unstyled mt-3 ${styles.body}`}>
                            <li>
                                <p className="fw-bold">Account Type</p>
                                <span className="pink">{user.accountType}</span>
                            </li>
                            <li>
                                <p className="fw-bold">Account Status</p>
                                <span className={user.status ? "green" : "text-danger"}>
                                    {user.status ? "ACTIVE" : "INACTIVE"}
                                </span>
                            </li>
                        </ul>

                        <ul className={`list-unstyled mt-3 ${styles.body}`}>
                            <li>
                                <button disabled className="btn btn-md btn_primary white">
                                    Fund Account
                                </button>
                            </li>
                            <li>
                                <Link href="/dashboard/user/withdrawal" className="btn btn-md btn_green white">
                                    Withdraw Funds
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-sm-8">
                    <div className={`mr-2 ${styles.liveChart}`}>
                        <Chart />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
