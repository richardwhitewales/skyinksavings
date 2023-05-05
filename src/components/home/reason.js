import styles from '@/components/home/Home.module.css'

export default function Reason() {
    return (
        <>
            <div className="container-fluid">
                <div className={`row px-md-5 py-5 bg_primary ${styles.reason}`}>
                    <div className="col-sm-6 text-start white">
                        <div className="m-2">
                            <div className="my-4">
                                <h5>Why Bank with US?</h5>
                                <h2>Besides saving fixed investments with investing, you have a chance to earn a better return</h2>
                            </div>

                            <hr />

                            <div className="my-4">
                                <h5>Self-build capability is increasingly important for your retirement and mortgage</h5>
                            </div>

                            <hr />

                            <div className="my-4">
                                <h5>We provide unforgetable support and topnotch security solutions for all our customers</h5>
                            </div>

                            <hr />

                            <div className="my-4">
                                <h5>We provide secured banking solutions for your safety and security</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 white p-5">
                        <h1>Our process is simple. We will move over your Direct Debits and cover all those tricky admin bits</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
