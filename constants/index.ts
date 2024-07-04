import {
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music,
    Settings,
    VideoIcon,
    ImageOff,
    Sparkles,
    StarOff,
    Palette,
    ImageMinus,
    User,
    CreditCard,
} from "lucide-react";

export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-300",
        bgColor: "bg-orange-300/10",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-blue-700",
        bgColor: "bg-blue-700/10",
    },
    {
        label: "Image Restore",
        icon: ImageOff,
        href: "/transformations/add/restore",
        color: "text-blue-700",
        bgColor: "bg-blue-700/10",
    },
    {
        label: "Generative Fill",
        icon: Sparkles,
        href: "/transformations/add/fill",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    {
        label: "Object Remove",
        icon: StarOff,
        href: "/transformations/add/remove",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        label: "Object Recolor",
        icon: Palette,
        href: "/transformations/add/recolor",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        label: "Background Remove",
        icon: ImageMinus,
        href: "/transformations/add/removeBackground",
        color: "text-teal-500",
        bgColor: "bg-teal-500/10",
    },
    {
        label: "Profile",
        icon: User,
        href: "/profile",
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
    },
    {
        label: "Buy Credits",
        icon: CreditCard,
        href: "/credits",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-gray-500",
        bgColor: "bg-gray-500/10",
    },
];

export const amountOptions = [
    {
        value: "1",
        label: "1 Photo",
    },
    {
        value: "2",
        label: "2 Photo",
    },
    {
        value: "3",
        label: "3 Photo",
    },
    {
        value: "4",
        label: "4 Photo",
    },
    {
        value: "5",
        label: "5 Photo",
    },
];

export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    },
];

export const plans = [
    {
        _id: 1,
        name: "Free",
        icon: "/assets/icons/free-plan.svg",
        price: 0,
        credits: 20,
        inclusions: [
            {
                label: "20 Free Credits",
                isIncluded: true,
            },
            {
                label: "Basic Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: false,
            },
            {
                label: "Priority Updates",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 2,
        name: "Pro Package",
        icon: "/assets/icons/free-plan.svg",
        price: 40,
        credits: 120,
        inclusions: [
            {
                label: "120 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: true,
            },
            {
                label: "Priority Updates",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 3,
        name: "Premium Package",
        icon: "/assets/icons/free-plan.svg",
        price: 199,
        credits: 2000,
        inclusions: [
            {
                label: "2000 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: true,
            },
            {
                label: "Priority Updates",
                isIncluded: true,
            },
        ],
    },
];

export const transformationTypes = {
    restore: {
        type: "restore",
        title: "Restore Image",
        subTitle: "Refine images by removing noise and imperfections",
        config: { restore: true },
        icon: ImageOff,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
    removeBackground: {
        type: "removeBackground",
        title: "Background Remove",
        subTitle: "Removes the background of the image using AI",
        config: { removeBackground: true },
        icon: ImageMinus,
        color: "text-teal-500",
        bgColor: "bg-teal-500/10",
    },
    fill: {
        type: "fill",
        title: "Generative Fill",
        subTitle: "Enhance an image's dimensions using AI outpainting",
        config: { fillBackground: true },
        icon: Sparkles,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    remove: {
        type: "remove",
        title: "Object Remove",
        subTitle: "Identify and eliminate objects from images",
        config: {
            remove: { prompt: "", removeShadow: true, multiple: true },
        },
        icon: StarOff,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    recolor: {
        type: "recolor",
        title: "Object Recolor",
        subTitle: "Identify and recolor objects from the image",
        config: {
            recolor: { prompt: "", to: "", multiple: true },
        },
        icon: Palette,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
};

export const aspectRatioOptions = {
    "1:1": {
        aspectRatio: "1:1",
        label: "Square (1:1)",
        width: 1000,
        height: 1000,
    },
    "3:4": {
        aspectRatio: "3:4",
        label: "Standard Portrait (3:4)",
        width: 1000,
        height: 1334,
    },
    "9:16": {
        aspectRatio: "9:16",
        label: "Phone Portrait (9:16)",
        width: 1000,
        height: 1778,
    },
};

export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
};

export const creditFee = -1;
