import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0  bg-gray-900">
                <Sidebar
                    creditBalance={user.creditBalance}
                    creditAmount={user.creditAmount}
                    planId={user.planId}
                />
            </div>
            <main className="md:pl-72">
                <Navbar
                    creditBalance={user.creditBalance}
                    creditAmount={user.creditAmount}
                    planId={user.planId}
                />
                {children}
            </main>
        </div>
    );
}
