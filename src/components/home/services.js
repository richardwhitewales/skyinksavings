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
                            <img src="/contact.png" className="rounded" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
