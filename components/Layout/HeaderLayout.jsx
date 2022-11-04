import React from "react";
import Head from "next/head";
import Script from "next/script";
const HeaderLayout = ({ title }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>{title} Bulacan State University</title>
      </Head>
      <Script src="https://unpkg.com/read-excel-file@4.x/bundle/read-excel-file.min.js" />
    </>
  );
};

export default HeaderLayout;
