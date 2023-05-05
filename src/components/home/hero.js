import styles from '@/components/home/Home.module.css'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className={`d-flex align-items-center ${styles.hero}`}>
            <div className="container primary">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="display-3 fw-bold mt-5">Fast And Easy Business Banking.</h1>
                        <p>
                            The banking union ensures that banks are stronger and better supervised. ...integration of the banking system
                            was needed for the US & EURO areas countries.
                        </p>
                        <Link href="/auth/login" className="btn btn-lg mt-5 btn_primary">
                            Get Started
                        </Link>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div className="m-2">
                            <img src="/hero.png" alt="hero" className={styles.hero_img} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
