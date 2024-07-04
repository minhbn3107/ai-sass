import { Control } from "react-hook-form";
import { z } from "zod";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";

import { transformationSchema } from "@/schemas";

type CustomFieldProps = {
    control: Control<z.infer<typeof transformationSchema>> | undefined;
    render: (props: { field: any }) => React.ReactNode;
    name: keyof z.infer<typeof transformationSchema>;
    formLabel?: string;
    className?: string;
};

export const CustomField = ({
    control,
    render,
    name,
    formLabel,
    className,
}: CustomFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    <FormControl>{render({ field })}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
