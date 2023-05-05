import Link from "next/link";

export default function Services() {
    return (
        <>
            <div className="container py-5 p-md-5 bg_white primary">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="m-2">
                            <div>
                                <h2><b>We Make You Smile</b></h2>
                                <p className="text-muted">
                                    Take your bank to everywhere you go. Besides saving fixed investments
                                    with investing, you have a chance to earn a better return in the long term than with saving.
                                </p>
                            </div>
                            <div className="mt-5">
                                <h2><b>Investment Planning</b></h2>
                                <p className="text-muted">
                                    Besides saving fixed investments with investing, you have a chance to
                                    earn a better return in the long term than with saving. But also invest
                                    for you? Read about the pros and cons of investing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="m-2">
                            <img src="/contact.png" width="100%" />
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <div className="m-2">
                            <h2><b>Services</b></h2>
                        </div>
                    </div>

                    <div className="col-12 mt-5">
                        <div className="m-2">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4 className="fw-bold">
                                        Besides saving fixed investments with investing, you have a chance to earn a better return
                                    </h4>
                                    <hr className="my-5" />
                                    <h4 className="fw-bold">
                                        We provide secured banking solutions for your safety and security
                                    </h4>
                                </div>

                                <div className="col-sm-6">
                                    <h4 className="fw-bold">
                                        Self-build capability is increasingly important for your retirement and mortgage
                                    </h4>
                                    <hr className="my-5" />
                                    <h4 className="fw-bold">
                                        We provide unforgetable support and topnotch security solutions for all our customers
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-10 mt-5">
                        <div className="m-2">
                            <div className="row justify-content-center">
                                <div className="col-sm-6">
                                    <h4 className="fw-bold">Is investing something for you?</h4>
                                </div>

                                <div className="col-sm-6 text-end">
                                    <Link href="/auth/login" className="btn border_none btn-lg btn_secondary">
                                        GET STARTED
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
