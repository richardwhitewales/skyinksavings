import styles from '@/components/home/Home.module.css'
import { Building, Money, SmartHome, User, Wallet } from 'iconsax-react'

export default function Banking() {
    return (
        <>
            <div className="container-fluid">
                <div className="row px-md-5 py-5 bg_primary">
                    <div className="col-12 text-center white">
                        <h1>Banking For Your Needs</h1>
                    </div>

                    <div className="col-sm-6">
                        <div className="m-2 shadow d-flex justify-content-between primary p-3 bg_white rounded">
                            <div>
                                <small>Bank For</small>
                                <h3>Individuals</h3>
                            </div>

                            <User />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="m-2 shadow d-flex justify-content-between primary p-3 bg_white rounded">
                            <div>
                                <small>Bank For</small>
                                <h3>Business</h3>
                            </div>

                            <Building />
                        </div>
                    </div>
                </div>

                <div className="row pt-3 pb-5 bg_primary">
                    <div className="col-sm-4">
                        <div className="m-2 primary p-3 bg_white">
                            <Money />
                            <h4>Customer Loan</h4>
                            <p className="text-muted">
                                Whether you are looking to finance a new car, renovate your home, or consolidate your debt,
                                our customer loan offer has got you covered. With this offer, you can borrow the amount you need,
                                at a rate that suits your budget, and repay it over a period that works best for you
                            </p>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="m-2 primary p-3 bg_white">
                            <SmartHome />
                            <h4>Online Banking</h4>
                            <p className="text-muted">
                                Our online banking system is designed to make it easy for customers to manage their accounts,
                                transfer funds, pay bills, and access a wide range of banking services from the comfort of their
                                homes or offices. With a simple and intuitive interface, customers can easily navigate through
                                the different features of the online banking system and complete their transactions with ease.
                            </p>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="m-2 primary p-3 bg_white">
                            <Wallet />
                            <h4>Savings & CDs</h4>
                            <p className="text-muted">
                                Our savings accounts come with competitive interest rates, and we offer a variety of options to help
                                customers save for their short-term and long-term goals. Customers can choose from a regular savings
                                account, a high-yield savings account, and a money market account, depending on their preferences and
                                financial needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
