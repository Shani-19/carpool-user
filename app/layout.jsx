import ClientLayout from "./ClientLayout";

  export const metadata = {
    metadataBase: new URL("https://www.carpoolkr.com"),

    title: {
      default: "Carpool Korea",
      template: "%s | Carpool Korea",
    },

    description: "Carpool Korea - No.1 Auto Trading Platform in Korea",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },

    openGraph: {
      siteName: "Carpool Korea",
      type: "website",
      url: "/",
      title: "Carpool Korea",
      description: "Carpool Korea - No.1 Auto Trading Platform in Korea",
      locale: "en_US",
      images: [
        {
          url: "/assets/og/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Carpool Korea",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Carpool Korea",
      description: "Carpool Korea - No.1 Auto Trading Platform in Korea",
      images: ["/assets/og/og-image.jpg"],
    },

    icons: {
      icon: [
        { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/assets/favicon/favicon.ico" },
      ],
      apple: [{ url: "/assets/favicon/apple-icon-180x180.png", sizes: "180x180" }],
    },

    // verification: {
    //   google: "YOUR_CODE_HERE",
    // },

  };

  export const viewport = {
    width: "device-width",
    initialScale: 1,
  };


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );


}


// "use client";
// import FilterSidebar from "@/components/common/FilterSidebar";
// import "../public/main.scss";
// import "photoswipe/dist/photoswipe.css";
// import "rc-slider/assets/index.css";
// import { useEffect } from "react";
// import MobileMenu from "@/components/headers/MobileMenu";
// import Context from "@/context/Context";
// import BackToTop from "@/components/common/BackToTop";
// import { usePathname } from "next/navigation"; // Import usePathname
// import { AuthProvider } from "@/context/AuthContext";

// export default function RootLayout({ children }) {
//   const pathname = usePathname(); // Get pathname directly

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Import the script only on the client side
//       import("bootstrap/dist/js/bootstrap.esm").then(() => {
//         // Module is imported, you can access any exported functionality if
//       });
//     }

//     if (typeof window !== "undefined") {
//       // Initialize WOW.js
//       const { WOW } = require("wowjs");
//       const wow = new WOW({
//         mobile: false,
//         live: false,
//       });
//       wow.init();
//     }
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>
//         <Context>
//           <MobileMenu />
//           <div className="boxcar-wrapper">
//             <AuthProvider>{children}</AuthProvider>
//           </div> <FilterSidebar />{" "}
//         </Context>
//         <BackToTop />
//       </body>
//     </html>
//   );
// }
