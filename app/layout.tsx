import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
	title: "CashTrackr",
	description: "Budget and Expense Manager",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body
				className={outfit.className}
			>
				{children}
				<Toaster position="top-right" richColors expand />
			</body>
		</html>
	);
}
