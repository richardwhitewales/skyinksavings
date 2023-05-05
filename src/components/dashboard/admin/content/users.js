import Link from 'next/link'
import styles from '@/components/dashboard/Content.module.css'
import { toCurrency } from '@/components/utils/toCurrency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEnvelope, faPhone, faFlag, faGlobeAmericas, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc, getDocs, collection, limit, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function Users() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
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
                            Users
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">FirstName</th>
                                        <th scope="col">LastName</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Zip Code</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((users, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{users.firstName}</td>
                                            <td>{users.lastName}</td>
                                            <td>{users.email}</td>
                                            <td>{users.phoneNumber}</td>
                                            <td>{users.zipCode}</td>
                                            <td>{users.country}</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn_primary border border-dark"
                                                    data-bs-toggle="modal" data-bs-target="#userModal"
                                                    onClick={() => setSelectedUser(users)}>
                                                    view
                                                </button>
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/dashboard/admin/users_update?email=${users.email}`}
                                                    className="btn btn-sm btn_secondary white border border-warning">
                                                    update
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedUser ?
                        <div className="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="userModalLabel">{selectedUser.firstName} {selectedUser.lastName}</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedUser(null)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div>
                                                        <FontAwesomeIcon icon={faUserCircle} className="secondary mb-2" size="4x" />
                                                    </div>
                                                    <div>
                                                        <b>Gender</b>
                                                        <p>{selectedUser.gender}</p>
                                                    </div>
                                                    <div>
                                                        <b>First Name</b>
                                                        <p>{selectedUser.firstName}</p>
                                                    </div>
                                                    <div>
                                                        <b>Last Name</b>
                                                        <p>{selectedUser.lastName}</p>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faEnvelope} /> <b>Email</b>
                                                        <p>{selectedUser.email}</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div>
                                                        <FontAwesomeIcon icon={faPhone} /> <b>Phone Number</b>
                                                        <p>{selectedUser.phoneNumber}</p>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faFlag} /> <b>Zip Code</b>
                                                        <p>{selectedUser.zipCode}</p>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faGlobeAmericas} /> <b>Country</b>
                                                        <p>{selectedUser.country}</p>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faLock} /> <b>Password</b>
                                                        <p>{selectedUser.password ? selectedUser.password : "No Password for this account"}</p>
                                                    </div>
                                                </div>

                                                <hr />

                                                <div className="col-12">
                                                    <div className="row mt-5">
                                                        <div className="col-md-4">
                                                            <div className={`mr-2 mb-2 ${styles.balanceCard} shadow`}>
                                                                <span className={styles.title}>
                                                                    Total Balance
                                                                </span>
                                                                <span className={styles.balance}>
                                                                    {toCurrency(selectedUser.dashboard.balance)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className={`mr-2 mb-2 ${styles.balanceCard} bg_secondary shadow`}>
                                                                <span className={`${styles.title} bg_white secondary`}>
                                                                    Deposit
                                                                </span>
                                                                <span className={`${styles.balance} white`}>
                                                                    {toCurrency(selectedUser.dashboard.deposit)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className={`mr-2 mb-2 ${styles.balanceCard} bg_primary shadow`}>
                                                                <span className={`${styles.title} bg_white primary`}>
                                                                    Withdraw
                                                                </span>
                                                                <span className={`${styles.balance} white`}>
                                                                    {toCurrency(selectedUser.dashboard.withdraw)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="userModalLabel"></h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
