import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
    return (
        <>
            <div className="container pt-5 bg_white">
                <div className="row justify-content-center">
                    <div className="col-sm-6 primary">
                        <div className="m-2">
                            <h2><b>Contact Us</b></h2>
                            <p>
                                For any complaint, enquiry or advice, please fill the
                                form or you can contact us by sending an e-mail to
                                info@skyinksavings.com and be rest assured
                                that we will get back to you within 24 hours
                            </p>

                            <div className="d-flex mt-5 my-3">
                                <span><FontAwesomeIcon icon={faLocation} className="mx-2 align-vertical-middle" /></span>
                                <Link href="#" target="_blank" className="text-decoration-none primary" >
                                    Gabalfa Avenue, Cardiff CF14 2SH, UK
                                </Link>
                            </div>
                            <div className="d-flex my-3">
                                <span><FontAwesomeIcon icon={faEnvelope} className="mx-2 align-vertical-middle" /></span>
                                <Link href="mailto:info@skyinksavings.com" target="_blank" className="text-decoration-none primary" >
                                    info@skyinksavings.com
                                </Link>
                            </div>
                            <div className="d-flex my-3">
                                <span><FontAwesomeIcon icon={faPhone} className="mx-2 align-vertical-middle" /></span>
                                <Link href="tel:+000000000000" target="_blank" className="text-decoration-none primary" >
                                    +00-000-000-0000
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 mt-4">
                        <div className="m-2">
                            <div className="mb-3">
                                <input type="text" className="form-control bg_primary white p-3" id="fullName" placeholder="John Doe" />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control bg_primary white p-3" id="emailAddr" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control bg_primary white p-3" id="message" rows="4"></textarea>
                            </div>

                            <Link href="#" className="btn btn-lg btn_secondary">
                                SEND NOW
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 mt-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79475.19226983136!2d-3.2874502448557323!3d51.50221188372996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e02d434ec53f5%3A0x143406db6586670e!2sCardiff%2C%20UK!5e0!3m2!1sen!2sbr!4v1687420647590!5m2!1sen!2sbr" width="100%" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}
