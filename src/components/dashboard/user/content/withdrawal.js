import styles from '@/components/dashboard/Content.module.css'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc, getDocs, updateDoc, collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { toCurrency } from '@/components/utils/toCurrency'

export default function Withdrawal() {
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [amount, setAmount] = useState("");
    const [balanceErr, setBalanceErr] = useState("");

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
        const user = auth.currentUser;

        if (user) {
            const getHistoryData = async () => {
                const q = query(collection(db, 'history'), orderBy("addedOn", "desc"));

                const usersSnapshot = await getDocs(q);
                let innerHistory = [];

                usersSnapshot.forEach((doc) => {
                    const data = doc.data();

                    if (data.email == user.email) {
                        innerHistory.push(data)
                    }
                });
                setHistory(innerHistory);
            };
            getHistoryData();
        }
    }, []);

    if (!user) {
        return <div className={styles.process} />
    }

    const makeWithdraw = async event => {
        event.preventDefault();

        const docRef = doc(db, 'users', user.email);
        const balance = parseInt(user.dashboard.balance);
        const withdrawBalance = parseInt(user.dashboard.withdraw);
        const intAmount = parseInt(amount);

        if (intAmount > balance || balance == 0) {
            setBalanceErr("Insufficient balance");
        } else {
            await updateDoc(docRef, {
                "dashboard.balance": `${balance - intAmount}`,
                "dashboard.withdraw": `${withdrawBalance + intAmount}`,
            }).then(() => {
                const collRef = collection(db, "history");
                const userDoc = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    amount: amount,
                    addedOn: serverTimestamp()
                };
                addDoc(collRef, userDoc);
                let otherSuccess = document.getElementById("otherSuccess");
                otherSuccess.style.display = "block";
            });
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.greeting}>
                Greetings,  {user.firstName}
            </div>

            <div className="container mt-5 p-5 rounded bg_primary">
                <div className="row justify-content-center">
                    <div className="col text-center white">
                        <div className="d-flex flex-column m-2">
                            <b className="h1">
                                {toCurrency(user.dashboard.balance)}
                            </b>
                            Available funds
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5 justify-content-center">
                <div className="col-sm-8 mb-2">
                    <div className={`mr-2 ${styles.card} ${styles.faq}`}>
                        <b>Make Withdrawal</b>

                        <hr />

                        <div className="alert alert-info">
                            <b>NOTE</b>
                            <br />
                            Depending on your Location, Bank Withdrawal can take up to 5 Business Days to confirm.
                            If you are making a bank transfer, please note that depending on your location,
                            transaction might take up to 5 business days to confirm. If you encounter any
                            issue while funding your account, please contact info@skyinksavings.com for assistance.
                        </div>

                        <form onSubmit={makeWithdraw}>
                            <div id="otherSuccess" className="alert alert-success text-center" style={{ display: "none" }}>
                                We will contact you soon!
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otherAmount"
                                    required
                                    placeholder="Amount (usd)"
                                    onChange={(event) => setAmount(event.target.value)}
                                />
                                <label htmlFor="otherAmount">Amount (USD)</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" required id="otherPaymentMethod">
                                    <option selected>Bank Transfer</option>
                                    <option value="1">Western Union</option>
                                    <option value="2">Perfect Money</option>
                                </select>
                                <label htmlFor="otherPaymentMethod">Payment Method</label>
                            </div>

                            <button type="submit" className="btn btn-lg btn_dark white m-2">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <div className={`mr-2 mb-2 ${styles.wallet}`} style={{ height: "auto" }}>
                        <div className={`${styles.header} border-none border-bottom-0`}>
                            History
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Account Number</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((his, index) => (
                                        his.email == user.email &&
                                        <tr key={index}>
                                            <th scope="row">{his.addedOn.toDate().toLocaleDateString()}</th>
                                            <td>{his.firstName} {his.lastName}</td>
                                            <td>{his.email}</td>
                                            <td>Withdrawal</td>
                                            <td>...{user.accountNumber.slice(user.accountNumber.length - 4)}</td>
                                            <td>{his.phoneNumber}</td>
                                            <td>{toCurrency(his.amount)}</td>
                                            <td>{toCurrency(user.dashboard.balance)}</td>
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
