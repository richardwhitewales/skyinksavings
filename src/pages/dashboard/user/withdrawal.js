import Head from 'next/head'
import { getWSSchema, getWPSchema, getLBSchema } from '@/components/schema';
import Withdrawal from '@/components/dashboard/user/content/withdrawal'
import Sidebar from '@/components/dashboard/user/navigation/sidebar';
import Navbar from '@/components/dashboard/user/navigation/navbar';

export default function WithdrawalPage() {
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
            streetAddress: "Gabalfa Avenue, Cardiff CF14 2SH, UK",
            addressLocality: "Gabalfa Avenue",
            addressRegion: "Cardiff",
            postalCode: "CF14",
            addressCountry: "UK"
        },
        "+44 741 837 1908",
        "info@skyinksavings.com",
        baseURL,
        `${baseURL}/favicon.png`,
        "Cash, Credit Card, Transfer",
        "NGN, USD, EURO",
        "Mo-Fr 09:00-17:00",
        {
            latitude: "51.481581",
            longitude: "-3.17909"
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
                <Withdrawal />
            </main>
        </>
    )
}
