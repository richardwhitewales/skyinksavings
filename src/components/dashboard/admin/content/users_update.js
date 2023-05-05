import styles from '@/components/dashboard/Content.module.css'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from "@/firebase/fire_config";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function UsersUpdate() {
    const [accountType, setAccountType] = useState("Savings");
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState("");
    const [done, setDone] = useState(false);
    const router = useRouter();
    const email = router.query.email;

    useEffect(() => {
        if (router.query.email == null) {
            router.push("/dashboard/admin/users")
        }

        const profileRef = doc(db, 'users', email);
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
    }, []);

    const updateBalance = async event => {
        event.preventDefault();

        const docRef = doc(db, 'users', user.email);
        const balance = parseInt(user.dashboard.balance);
        const intAmount = parseInt(amount);

        await updateDoc(docRef, {
            "dashboard.balance": `${balance + intAmount}`,
        }).then(() => { setDone(true) });
    }

    const updateVisibility = async event => {
        event.preventDefault();

        const docRef = doc(db, 'users', user.email);
        await updateDoc(docRef, {
            "accountType": accountType,
        }).then(() => { setDone(true) });
    }

    if (!user) {
        return <div className={styles.process} />
    }

    async function disableAccount() {
        const docRef = doc(db, 'users', user.email);
        await updateDoc(docRef, { "status": false }).then(() => { setDone(true) });
    }

    async function enableAccount() {
        const docRef = doc(db, 'users', user.email);
        await updateDoc(docRef, { "status": true }).then(() => { setDone(true) });
    }

    return (
        <div className={styles.content}>

            <div className={styles.greeting}>
                Greetings,  {user.username}
            </div>

            <div className="row justify-content-center mt-5">
                {done && <div className="alert alert-success">Profile Updated!</div>}

                <div className="col-sm-6">
                    <div className={`m-2 ${styles.wallet} shadow `} style={{ height: "auto" }}>
                        <div className={styles.header}>
                            Update Profile
                        </div>
                        <form onSubmit={updateVisibility} className="mt-4">
                            <div className="d-flex mb-3">
                                <div className="col-12">
                                    <div className="form-floating mx-1">
                                        <select
                                            className="form-select"
                                            id="accountType"
                                            required
                                            onChange={(event) => setAccountType(event.target.value)}
                                        >
                                            <option selected>Savings</option>
                                            <option value="Checking">Checking</option>
                                            <option value="Fixed Deposit">Fixed Deposit</option>
                                            <option value="Offshore">Offshore</option>
                                        </select>
                                        <label htmlFor="accountType">Account Type</label>
                                    </div>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-md btn-success">Update</button>
                        </form>

                    </div>
                    <div className="col-12 m-4">
                        <button type="submit" className={`btn btn-md ${user.status ? "btn-danger" : "btn-warning"}`} onClick={user.status ? disableAccount : enableAccount}>
                            {user.status ? "Disable" : "Enable"}
                        </button>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className={`m-2 ${styles.wallet} shadow `} style={{ height: "auto" }}>
                        <div className={styles.header}>
                            Update Balance
                        </div>
                        <form onSubmit={updateBalance} className="mt-4">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="amountSent"
                                    required
                                    placeholder="Amount Sent (usd)"
                                    onChange={(event) => setAmount(event.target.value)}
                                />
                                <label htmlFor="amountSent">Amount (usd)</label>
                            </div>
                            <div className="modal-footer" style={{ border: "none" }}>
                                <button type="submit" className="btn btn-md btn-success">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
