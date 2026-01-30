import { ProfileTabs } from "@/components/profile";

export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProfileTabs />
            {children}
        </>
    )
}