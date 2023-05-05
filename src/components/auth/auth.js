import Link from 'next/link'
import styles from '@/components/auth/Auth.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/firebase/fire_auth_context';
import Cookies from 'js-cookie';
import { auth, db } from "@/firebase/fire_config";
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { countryOption } from '@/components/utils/country';
import { randomNum } from '@/components/utils/random_num';

export default function Auth({ isLogin, isSignup }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("AFGHANISTAN");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [currencyType, setCurrencyType] = useState("$");
    const [accountType, setAccountType] = useState("Savings");
    const [gender, setGender] = useState("Male");
    const [dob, setdob] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpError, setSignUpError] = useState(null);
    const [resetEmail, setResetEmail] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");
    const accountNumber = randomNum(10);
    const rountingNumber = randomNum(9);

    const router = useRouter();
    const { signIn, signUp } = useAuth();


    const onLogin = async event => {
        event.preventDefault();
        setLoading(true);

        await signIn(email, password)
            .then((data) => {
                setLoading(false);
                const profileRef = doc(db, "users", data.user.email);
                getDoc(profileRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const user = docSnapshot.data();
                            if (user.status == false) {
                                router.push('/dashboard/auth/login');
                            }
                            else {
                                Cookies.set("SkyinkSignedIn", true, { expires: 7 });
                                if (user.email == "info@skyinksavings.com") {
                                    router.push('/dashboard/admin');
                                }
                                else {
                                    router.push('/dashboard/user');
                                }
                            }
                        } else {
                            console.log('Profile not found');
                        }
                    })
                    .catch((error) => {
                        console.log('Error getting profile:', error);
                    });
            })
            .catch(error => {
                setLoading(false);
                if (error.code === "auth/user-not-found") {
                    setError("User Not Found")
                } else if (error.code === "auth/wrong-password") {
                    setError("Wrong Password")
                }
                else {
                    setError(error.code)
                }
            });
    };

    const onSignUp = async event => {
        event.preventDefault();
        setLoading(true);

        await signUp(signUpEmail, signUpPassword)
            .then(() => {
                const collRef = collection(db, "users");
                const userDoc = {
                    firstName: firstName,
                    lastName: lastName,
                    currencyType: currencyType,
                    accountType: accountType,
                    zipCode: zipCode,
                    country: country,
                    phoneNumber: phoneNumber,
                    email: signUpEmail,
                    gender: gender,
                    dob: dob,
                    password: signUpPassword,
                    status: true,
                    accountNumber: `${accountNumber}`,
                    rountingNumber: `${rountingNumber}`,
                    dashboard: {
                        balance: "0",
                        deposit: "0",
                        withdraw: "0"
                    }
                };

                setDoc(doc(collRef, signUpEmail), userDoc)
                    .then(() => {
                        setLoading(false);
                        router.push('/auth/login');
                    })
                    .catch(error => {
                        setLoading(false);
                        setSignUpError(error.code);
                    });

            }).catch(error => {
                setLoading(false);
                if (error.code === "auth/weak-password") {
                    setSignUpError("Weak Password")
                } else if (error.code === "auth/email-already-in-use") {
                    setSignUpError("User Already Exists")
                }
                else {
                    setSignUpError(error.code)
                }
            });
    };

    const onForgotPassword = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetSuccess("An email with a password reset link has been sent to your email address.");
            setLoading(false);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setResetError("User Not Found")
            } else {
                setResetError(`Something is wrong: ${error.message}`);
            }
            setLoading(false);
        }
    };

    if (isLogin) {
        return (
            <div className={styles.container}>
                <div className="row h-100">
                    <div className={`${styles.bg} col-sm-7 bg_primary p-5`}>
                        <div className="row flex-column justify-content-between h-100">
                            <div className="col-6" style={{ zIndex: 999 }}>
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="rounded"
                                    width={100}
                                />
                            </div>

                            <div className="col-6 white w-100" style={{ zIndex: 999 }}>
                                <h1>Login</h1>
                                <p>Enter your details to access Dashboard!</p>
                            </div>
                        </div>
                    </div>

                    <div className={`col-sm-5 p-5 position-relative ${styles.formContainer}`}>
                        {loading ? <div className={styles.process} /> : ""}

                        <form className={styles.form} onSubmit={onLogin}>
                            <div className="mb-3">Enter Your Login Credentials Below!</div>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control" id="emailAddr"
                                    required
                                    placeholder="Email Address"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <label htmlFor="emailAddr">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control" id="password"
                                    required
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="mt-5 col-sm-6 d-flex justify-content-between mb-2" style={{ border: "none" }}>
                                <button type="submit" className="btn btn-md btn_primary">Login</button>
                                or
                                <Link href="/auth/signup" className="secondary text-decoration-none">Signup</Link>
                            </div>
                            Forgot password? Reset <Link href="/auth/forgot_password" className="secondary text-decoration-none">here</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    if (isSignup) {
        return (
            <div className={styles.container}>
                <div className="row h-100">
                    <div className={`${styles.bg2} d-none d-md-block col-sm-7 bg_primary p-5`}>
                        <div className="row flex-column justify-content-between h-100">
                            <div className="col-6" style={{ zIndex: 999 }}>
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="rounded"
                                    width={100}
                                />
                            </div>

                            <div className="col-6 white w-100" style={{ zIndex: 999 }}>
                                <h1>Sign Up</h1>
                                <p>Enter your details to access Dashboard!</p>
                            </div>
                        </div>
                    </div>

                    <div className={`col-sm-5 p-5 position-relative ${styles.formContainer}`}>
                        {loading ? <div className={styles.process} /> : ""}

                        <div className="col-6 d-block d-md-none primary w-100" style={{ zIndex: 999 }}>
                            <h1>Sign Up</h1>
                            <p>Enter your details to access Dashboard!</p>
                        </div>

                        <form className={styles.form} onSubmit={onSignUp}>
                            <div className="mb-3 d-none d-md-block">Enter Your Credentials Below!</div>
                            {signUpError && <div className="alert alert-danger">{signUpError}</div>}

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
                                            onChange={(event) => setSignUpEmail(event.target.value)}
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

                            <div className="col-12 my-3">
                                <div className="form-floating mx-1">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        required
                                        placeholder="Password"
                                        onChange={(event) => setSignUpPassword(event.target.value)}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="privacyCheck" checked />
                                    <label className="form-check-label" for="privacyCheck">
                                        I accept the <Link href="/policy" className="secondary text-decoration-none">Terms of Use</Link>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4 col-sm-6 d-flex justify-content-between" style={{ border: "none" }}>
                                <button type="submit" className="btn btn-md btn_primary">Signup</button>
                                or
                                <Link href="/auth/login" className="secondary text-decoration-none">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className="row h-100">
                <div className={`${styles.bg3} col-sm-7 bg_primary p-5`}>
                    <div className="row flex-column justify-content-between h-100">
                        <div className="col-6" style={{ zIndex: 999 }}>
                            <img
                                src="/logo.png"
                                alt="logo"
                                className="rounded"
                                width={100}
                            />
                        </div>

                        <div className="col-6 white w-100" style={{ zIndex: 999 }}>
                            <h1>Forgot Password</h1>
                        </div>
                    </div>
                </div>

                <div className={`col-sm-5 p-5 position-relative ${styles.formContainer}`}>
                    {loading ? <div className={styles.process} /> : ""}

                    <form className={styles.form} onSubmit={onForgotPassword}>
                        <div className="mb-3">Enter Email Address Below!</div>
                        {resetError && <div className="alert alert-danger">{resetError}</div>}
                        {resetSuccess && <div className="alert alert-success">{resetSuccess}</div>}

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="emailAddr"
                                required
                                placeholder="Email Address"
                                onChange={(event) => setResetEmail(event.target.value)}
                            />
                            <label htmlFor="emailAddr">Email Address</label>
                        </div>

                        <div className="mt-5 col-sm-6 d-flex justify-content-between" style={{ border: "none" }}>
                            <button type="submit" className="btn btn-md btn_primary">Reset Password</button>
                            or
                            <Link href="/auth/login" className="secondary text-decoration-none">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
