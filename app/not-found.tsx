import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-gray-100 flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md space-y-2">
                    <div className="text-5xl font-dark font-bold">404</div>
                    <p className="text-2xl md:text-3xl font-light leading-normal">
                        Sorry we couldn&apos;t find this page.{" "}
                    </p>
                    <p className="mb-8">
                        But don&apos;t worry, you can find plenty of other
                        things on our dashboard.
                    </p>

                    <Link href="/dashboard">
                        <Button variant="update" className="mt-2" size="lg">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
                <div className="max-w-lg">
                    <Image
                        src="/not-found.svg"
                        alt="Not Found"
                        width="400"
                        height="400"
                    />
                </div>
            </div>
        </div>
    );
}
