import Head from 'next/head'
import { getWSSchema, getWPSchema, getLBSchema } from '@/components/schema';
import Deposit from '@/components/dashboard/user/content/deposit'
import Sidebar from '@/components/dashboard/user/navigation/sidebar';
import Navbar from '@/components/dashboard/user/navigation/navbar';

export default function DepositPage() {
    // page default data
    const pageName = "Sky Ink Savings - Dashboard";
    const pageDesc = "Discover the ultimate banking experience with Sky Ink Savings. Our secure and innovative online banking services offer high interest rates, easy account management, and 24/7 customer support. Join us today and start saving for your future with confidence.";
    const baseURL = "https://skyinksavings.com/dashboard/user";

    // web site schema
    const wSSchema = getWSSchema(baseURL);

    // web page schema
    const wPSchema = getWPSchema(
        pageName,
        pageDesc,
        baseURL,
        [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Dashboard",
                "item": baseURL
            }
        ]
    );

    // local business schema
    const lBSchema = getLBSchema(
        pageName,
        {
            streetAddress: "",
            addressLocality: "",
            addressRegion: "",
            postalCode: "",
            addressCountry: ""
        },
        "+00-000-000-0000",
        "info@skyinksavings.com",
        baseURL,
        `${baseURL}/favicon.png`,
        "Cash, Credit Card, Transfer",
        "NGN, USD, EURO",
        "Mo-Fr 09:00-17:00",
        {
            latitude: "",
            longitude: ""
        }
    );

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content={pageDesc} />
                <meta name="keywords" content="Bank Accounts, Mortgages, Loans and Savings" />
                <meta name="theme-color" content="#200752" />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <meta name="author" content="Sky Ink Savings" />
                <title>{pageName}</title>

                <meta property="og:title" content={pageName} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:image:width" content="1277" />
                <meta property="og:image:height" content="473" />
                <meta property="og:url" content={baseURL} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:site_name" content={pageName} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wSSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wPSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lBSchema) }} />
            </Head>

            <main className="d-flex" style={{ paddingTop: "6.5rem" }}>
                <Sidebar />
                <Navbar />
                <Deposit />
            </main>
        </>
    )
}