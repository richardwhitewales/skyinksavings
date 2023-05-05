import Link from 'next/link'
import styles from '@/components/dashboard/Content.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEnvelope, faPhone, faFlag, faUser, faGlobeAmericas, faPerson } from '@fortawesome/free-solid-svg-icons'
import { toCurrency } from '@/components/utils/toCurrency'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { countryOption } from '@/components/utils/country';

export default function Wallet() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("AFGHANISTAN");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [currencyType, setCurrencyType] = useState("$");
    const [accountType, setAccountType] = useState("Savings");
    const [gender, setGender] = useState("Male");
    const [dob, setdob] = useState("");
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

    const onUpdate = async event => {
        event.preventDefault();

        const docRef = doc(db, 'users', user.email);

        await updateDoc(docRef, {
            firstName: firstName,
            lastName: lastName,
            currencyType: currencyType,
            accountType: accountType,
            zipCode: zipCode,
            country: country,
            phoneNumber: phoneNumber,
            email: email,
            gender: gender,
            dob: dob,
        }).then(() => { setDone(true) });
    };

    return (
        <div className={styles.content}>
            <div className={styles.greeting}>
                Greetings,  {user.firstName}
            </div>

            <div className="row mt-5">
                <div className="col-sm-6">
                    <div className={`mr-2 mb-2 ${styles.wallet}`} style={{ height: "auto" }}>
                        <div className={styles.header}>
                            Profile
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faUserCircle} className="pink my-2" size="3x" />
                                <div className="d-flex flex-column mx-4">
                                    <small className="text-muted">Hello</small>
                                    <p style={{ fontSize: "18px" }}>
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                        <FontAwesomeIcon icon={faGlobeAmericas} className="primary" /> {user.country}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                        <FontAwesomeIcon icon={faPhone} className="primary" /> {user.phoneNumber}
                                    </p>
                                </div>
                                <div className="d-flex flex-column mx-4">
                                    <p style={{ fontSize: "18px" }}>
                                        <FontAwesomeIcon icon={faUser} className="primary" /> {user.firstName}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                        <FontAwesomeIcon icon={faFlag} className="primary" /> {user.zipCode}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                        <FontAwesomeIcon icon={faEnvelope} className="primary" /> {user.email}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                        <FontAwesomeIcon icon={faPerson} className="primary" /> {user.gender}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form className={`mt-4 ${styles.form}`} onSubmit={onUpdate}>
                            {done && <div className="alert alert-success">Profile Updated!</div>}

                            <div className="d-flex mb-3 justify-content-between">
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            required
                                            placeholder="First Name"
                                            onChange={(event) => setFirstName(event.target.value)}
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            required
                                            placeholder="Last Name"
                                            onChange={(event) => setLastName(event.target.value)}
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mb-3 justify-content-between">
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <select
                                            className="form-select"
                                            id="currencyType"
                                            required
                                            onChange={(event) => setCurrencyType(event.target.value)}
                                        >
                                            <option selected>$</option>
                                            <option value="€">€</option>
                                            <option value="£">£</option>
                                        </select>
                                        <label htmlFor="currencyType">Currency Type</label>
                                    </div>
                                </div>
                                <div className="col-6">
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

                            <div className="d-flex mb-3 justify-content-between">
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="zipCode"
                                            required
                                            placeholder="Zip Code"
                                            onChange={(event) => setZipCode(event.target.value)}
                                        />
                                        <label htmlFor="zipCode">Zip Code</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <select
                                            className="form-select"
                                            id="country"
                                            required
                                            onChange={(event) => setCountry(event.target.value)}
                                        >
                                            <option selected>AFGHANISTAN</option>
                                            {countryOption.map((countryOption) => (countryOption))}
                                        </select>
                                        <label htmlFor="country">Country</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mb-3 justify-content-between">
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            required
                                            placeholder="Phone Number"
                                            onChange={(event) => setPhoneNumber(event.target.value)}
                                        />
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailAddr"
                                            required
                                            placeholder="Email Address"
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                        <label htmlFor="emailAddr">Email Address</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mb-3 justify-content-between">
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <select
                                            className="form-select"
                                            id="gender"
                                            required
                                            onChange={(event) => setGender(event.target.value)}
                                        >
                                            <option selected>Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label htmlFor="gender">Gender</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dob"
                                            required
                                            placeholder="Date Of Birth"
                                            onChange={(event) => setdob(event.target.value)}
                                        />
                                        <label htmlFor="dob">Date Of Birth</label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 col-sm-6 d-flex justify-content-between" style={{ border: "none" }}>
                                <button type="submit" className="btn btn-md btn_primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-sm-6">
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
            </div>

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
