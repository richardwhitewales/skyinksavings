export default function Breadcrumb({ header }) {
    return (
        <div className="d-flex align-items-center breadcrumb">
            <div className="container white text-center">
                <h1 className="display-3 fw-bold">{header}</h1>
            </div>
        </div>
    )
}
