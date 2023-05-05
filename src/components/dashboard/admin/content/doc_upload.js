import Link from 'next/link'
import styles from '@/components/dashboard/Content.module.css'
import { toCurrency } from '@/components/utils/toCurrency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEnvelope, faPhone, faFlag, faGlobeAmericas, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc, getDocs, collection, limit, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function DocUpload() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const router = useRouter();

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

    useEffect(() => {
        const getUsersData = async () => {
            const q = query(collection(db, 'users'), limit(5));
            const usersSnapshot = await getDocs(q);
            let innerUsers = [];

            usersSnapshot.forEach((doc) => {
                const data = doc.data();
                innerUsers.push(data)
            });
            setUsers(innerUsers);
        };
        getUsersData();
    }, []);

    if (!user) {
        return <div className={styles.process} />
    }

    if (user.email != "info@skyinksavings.com") {
        router.push('/dashboard/user');
    }

    return (
        <div className={styles.content}>
            <div className={styles.greeting}>
                Greetings,  {user.firstName}
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <div className={`mr-2 mb-2 ${styles.wallet}`} style={{ height: "auto" }}>
                        <div className={`${styles.header} border-none border-bottom-0`}>
                            ID Docs
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Front</th>
                                        <th scope="col">Back</th>
                                        <th scope="col">Country</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((users, index) => (
                                        users.frontID && users.backID &&
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{users.username}</td>
                                            <td>{users.email}</td>
                                            <td>
                                                <Link href={users.frontID} target="_blank" className="btn btn-sm btn-success white">
                                                    View
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href={users.backID} target="_blank" className="btn btn-sm btn-success white">
                                                    View
                                                </Link>
                                            </td>
                                            <td>{users.country}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
