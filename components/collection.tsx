"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import {
    Pagination,
    PaginationContent,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { cn, formUrlQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search";

export const Collection = ({
    hasSearch = false,
    images,
    totalPages = 1,
    page,
}: {
    images: IImage[];
    totalPages?: number;
    page: number;
    hasSearch?: boolean;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // PAGINATION HANDLER
    const onPageChange = (action: string) => {
        const pageValue =
            action === "next" ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            searchParams: searchParams.toString(),
            key: "page",
            value: pageValue,
        });

        router.push(newUrl, { scroll: false });
    };

    return (
        <>
            <div className="collection-heading">
                <h2 className="h2-bold text-dark-600">Recent Edits</h2>
                {hasSearch && <SearchBar />}
            </div>

            {images.length > 0 ? (
                <ul className="collection-list">
                    {images.map((image) => (
                        <Card image={image} key={image.publicId} />
                    ))}
                </ul>
            ) : (
                <div className="collection-empty">
                    <p className="p-20-semibold">Empty List</p>
                </div>
            )}

            {totalPages > 1 && (
                <Pagination className="mt-10">
                    <PaginationContent className="flex w-full">
                        <Button
                            disabled={Number(page) <= 1}
                            className="collection-btn"
                            onClick={() => onPageChange("prev")}
                        >
                            <PaginationPrevious className="hover:bg-transparent hover:text-white" />
                        </Button>

                        <p className="flex-center p-16-medium w-fit flex-1">
                            {page} / {totalPages}
                        </p>

                        <Button
                            className="button w-32 bg-purple-gradient bg-cover text-white"
                            onClick={() => onPageChange("next")}
                            disabled={Number(page) >= totalPages}
                        >
                            <PaginationNext className="hover:bg-transparent hover:text-white" />
                        </Button>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
};

const Card = ({ image }: { image: IImage }) => {
    const transformationType =
        transformationTypes[image.transformationType as TransformationTypeKey];

    return (
        <li>
            <Link
                href={`/transformations/${image._id}`}
                className="collection-card"
            >
                <CldImage
                    src={image.publicId}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    {...image.config}
                    loading="lazy"
                    className="h-52 w-full rounded-[10px] object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
                <div className="grid grid-cols-[1fr_auto] items-center">
                    <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
                        {image.title}
                    </p>
                    {/* <transformationType.icon
                        className={cn("w-6 h-6", transformationType.color)}
                    /> */}
                </div>
            </Link>
        </li>
    );
};
