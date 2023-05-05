import styles from '@/components/dashboard/Content.module.css'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toCurrency } from '@/components/utils/toCurrency'

export default function Deposit() {
    const [user, setUser] = useState(null);
    const [deposit, setDeposit] = useState("");
    const [amount, setAmount] = useState("");
    const [done, setDone] = useState(false);

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

    const makeDeposit = async event => {
        event.preventDefault();

        const docRef = doc(db, 'users', user.email);
        const balance = parseInt(user.dashboard.balance);
        const depositBalance = parseInt(user.dashboard.deposit);
        const intAmount = parseInt(amount);

        await updateDoc(docRef, {
            "dashboard.balance": `${balance + intAmount}`,
            "dashboard.deposit": `${depositBalance + intAmount}`,
        }).then(() => { setDone(true) });
    }

    const otherPayment = async event => {
        event.preventDefault();

        let otherSuccess = document.getElementById("otherSuccess");
        otherSuccess.style.display = "block";
    }

    return (
        <div className={styles.content}>
            <div className={styles.greeting}>
                Greetings,  {user.firstName}
            </div>
            <div className="row mt-5">
                <div className="col-sm-6 mb-2">
                    <div className={`mr-2 ${styles.card}`}>
                        <p>Select your preferred investment plan</p>

                        <div className="row">
                            <div className="col-6">
                                <button className={`m-2 ${styles.planCard}`} onClick={() => setDeposit("STARTER")}>
                                    <b>10.00%</b> Monthly for 1 weekly
                                    USD 500.00 - USD 2,999.00
                                </button>
                            </div>
                            <div className="col-6">
                                <button className={`m-2 ${styles.planCard}`} onClick={() => setDeposit("BASIC")}>
                                    <b>15.00%</b> Monthly for 1 month
                                    USD 3,000.00 - USD 8,999.00
                                </button>
                            </div>
                            <div className="col-6">
                                <button className={`m-2 ${styles.planCard}`} onClick={() => setDeposit("STANDARD")}>
                                    <b>20.00%</b> Monthly for 1 month
                                    USD 9,000.00 - USD 15,999.00
                                </button>
                            </div>
                            <div className="col-6">
                                <button className={`m-2 ${styles.planCard}`} onClick={() => setDeposit("CORE")}>
                                    <b>24.99%</b> Monthly for 1 month
                                    USD 16,000.00 - USD 24,999.00
                                </button>
                            </div>
                            <div className="col-6">
                                <button className={`m-2 ${styles.planCard}`} onClick={() => setDeposit("ADVANCED")}>
                                    <b>30.00%</b> Monthly for 1 month
                                    USD 25,000.00 - USD 36,999.00
                                </button>
                            </div>
                            <div className="col-6">
                                <button className={`m-2 ${styles.planCard}`} onClick={() => setDeposit("PREMIUM")}>
                                    <b>30.00%</b> Monthly for 1 year
                                    USD 37,000.00 - USD 50,000.00
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-2">
                    <div id="selectPlan" style={{ display: "none" }} className="alert alert-danger m-2 text-center">
                        Select preferred investment plan!
                    </div>

                    <div className={`mr-2 ${styles.card} bg_primary white`}>
                        <span className={styles.totalDeposit}>
                            {toCurrency(user.dashboard.deposit.balance ? user.dashboard.deposit.balance : "0")}
                        </span>
                        <br />
                        Total Deposit
                    </div>

                    {deposit == "" ?
                        <button type="button" className="btn btn-lg btn_dark white m-2" onClick={() => { document.getElementById("selectPlan").style.display = "block"; }}>
                            Make deposit
                        </button>
                        :
                        <button type="button" className="btn btn-lg btn_dark white m-2" data-bs-toggle="modal" data-bs-target="#depositModal">
                            Make deposit
                        </button>
                    }

                    <div className="modal fade" id="depositModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="depositModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="depositModalLabel">Make Deposit</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="d-flex justify-content-around">
                                        <button type="button" className="btn btn-lg btn_dark white m-2" data-bs-toggle="modal" data-bs-target="#btcModal">
                                            BTC
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="btcModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="btcModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="btcModalLabel">BTC Deposit</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                </div>
                                <div className="modal-footer" style={{ border: "none" }}>
                                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#completedDeposit">I have completed deposit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="completedDeposit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="completedDepositLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="completedDepositLabel">Senders Info</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <form onSubmit={makeDeposit}>
                                    <div className="modal-body">
                                        {done && <div className="alert alert-success">All Done! Will contact you for confirmation</div>}

                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="amountSent"
                                                required
                                                placeholder="Amount Sent (usd)"
                                                onChange={(event) => setAmount(event.target.value)}
                                            />
                                            <label htmlFor="amountSent">Amount Sent (usd)</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer" style={{ border: "none" }}>
                                        <button type="submit" className="btn btn-md btn-success">Done</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-sm-6 mb-2">
                    <div className={`mr-2 ${styles.card} ${styles.faq} bg_primary white`}>
                        <b>FAQ</b>

                        <hr />

                        <p className="h6">What happens to a failed fund transaction?</p>
                        <span>This is rare but we will help sort out any failed transaction.</span>

                        <br />
                        <br />

                        <p className="h6">What is the fastest way to fund?</p>
                        <span>Bitcoin (BTC)</span>

                        <br />
                        <br />

                        <p className="h6">How long do I wait before my investment start counting?</p>
                        <span>Once your fund is confirmed, your investment starts counting.</span>
                    </div>
                </div>
                <div className="col-sm-6 mb-2">
                    <div className={`mr-2 ${styles.card} ${styles.faq}`}>
                        <b>Other payment methods</b>

                        <hr />

                        <form onSubmit={otherPayment}>
                            <div className="alert alert-info">
                                If you are making a bank transfer, please note that depending on your location,
                                transaction might take up to 5 business days to confirm. If you encounter any
                                issue while funding your account, please contact info@skyinksavings.com for assistance.
                            </div>

                            <div id="otherSuccess" className="alert alert-success text-center" style={{ display: "none" }}>
                                We will contact you soon!
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="otherAmount" required placeholder="Amount (usd)" />
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

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
