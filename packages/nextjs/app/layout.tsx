import { Metadata } from "next";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Impact Calculator",
    template: "%s | Impact Calculator",
  },
  description: "Built with 🏗 Impact Calculator",
  openGraph: {
    title: {
      default: "Impact Calculator App",
      template: "%s | Impact Calculator",
    },
    description: "Built with 🏗 Impact Calculator",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "Impact Calculator",
      template: "%s | Impact Calculator",
    },
    description: "Built with 🏗 Impact Calculator",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default ScaffoldEthApp;
