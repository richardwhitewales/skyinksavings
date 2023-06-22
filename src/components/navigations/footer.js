import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer>
            <div className="container-fluid p-md-5" style={{ background: "#FAF8FF" }}>
                <div className="row justify-content-center">
                    <div className="col-sm-7 primary">
                        <div className="my-3">
                            <p className="fw-bold">
                                For any complaint, enquiry or advice, please fill the form or you can contact us
                                by sending an e-mail to info@skyinksavings.com and be rest assured
                                that we will get back to you within 24 hours
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4 text-center">
                        <div className="my-3">
                            <Link href="/contact" className="btn btn-lg btn_primary">
                                CONTACT US
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5 px-3 bg_primary">
                <div className="row">
                    <div className="col-sm-4 white">
                        <Link href="/">
                            <img
                                src="/favicon.png"
                                alt="logo"
                                width={80}
                            />
                        </Link>
                        <div>
                            Discover the ultimate banking experience with Sky Ink Savings.
                            Our secure and innovative online banking services offer high
                            interest rates, easy account management, and 24/7 customer support.
                            Join us today and start saving for your future with confidence.

                            <ul className="mt-3 list-unstyled">
                                <li>
                                    <FontAwesomeIcon icon={faLocation} /> Gabalfa Avenue, Cardiff CF14 2SH, UK
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faEnvelope} /> info@skyinksavings.com
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} /> +00 (000) 000 0000
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-8 white">
                        <h3>Our Services</h3>

                        <div className="row">
                            <div className="col-sm-6">
                                <ul className="list-unstyled">
                                    <li className="nav-item py-2 px-0">
                                        <Link className="nav-link" href="/">Home</Link>
                                    </li>
                                    <li className="nav-item py-2 px-0">
                                        <Link className="nav-link" href="/about">About</Link>
                                    </li>
                                    <li className="nav-item py-2 px-0">
                                        <Link className="nav-link" href="/services">Services</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-6">
                                <ul className="list-unstyled">
                                    <li className="nav-item py-2 px-0">
                                        <Link className="nav-link" href="/contact">Contact Us</Link>
                                    </li>
                                    <li className="nav-item py-2 px-0">
                                        <Link className="nav-link" href="/policy">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 secondary text-center">© Copyright {new Date().getFullYear()}, Skyinksavings Limited | All Rights Reserved.</div>
                </div>
            </div>
        </footer>
    )
}