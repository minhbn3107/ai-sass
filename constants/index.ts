export const samplesOptions = [
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
];

export const lmAspectRatioOptions = [
    {
        value: "1:1",
        label: "1:1",
    },
    {
        value: "13:19",
        label: "13:19",
    },
    {
        value: "19:13",
        label: "19:13",
    },
    {
        value: "2:3",
        label: "2:3",
    },
    {
        value: "3:2",
        label: "3:2",
    },
];

export const plans = [
    {
        _id: 1,
        name: "Free Package",
        icon: "Map",
        price: 0,
        credits: 5,
        inclusions: [
            {
                label: "5 Free Credits",
                isIncluded: true,
            },
            {
                label: "Limited Access to Services",
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
        icon: "Map",
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
        icon: "Map",
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
        icon: "ImageOff",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
    removeBackground: {
        type: "removeBackground",
        title: "Background Remove",
        subTitle: "Removes the background of the image using AI",
        config: { removeBackground: true },
        icon: "ImageMinus",
        color: "text-teal-500",
        bgColor: "bg-teal-500/10",
    },
    fill: {
        type: "fill",
        title: "Generative Fill",
        subTitle: "Enhance an image's dimensions using AI outpainting",
        config: { fillBackground: true },
        icon: "Sparkles",
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
        icon: "StarOff",
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
        icon: "Palette",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
};

export const cldAspectRatioOptions = {
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
