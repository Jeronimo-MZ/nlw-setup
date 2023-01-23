import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

type CheckboxProps = {
    title: string;
    crossWhenChecked?: boolean;
    textXL?: boolean;
};
export const Checkbox: React.FC<CheckboxProps> = ({
    title,
    crossWhenChecked = false,
    textXL = false,
}) => {
    return (
        <RadixCheckbox.Root className="flex items-center gap-3 group">
            <div
                className={[
                    "h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-700 border-2 border-zinc-800",
                    "group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-600",
                ].join(" ")}
            >
                <RadixCheckbox.Indicator>
                    <Check size={20} className="text-white" weight="bold" />
                </RadixCheckbox.Indicator>
            </div>
            <span
                className={[
                    "font-semibold leading-tight text-white",
                    crossWhenChecked
                        ? "group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                        : "",
                    textXL ? "text-xl" : "",
                ].join(" ")}
            >
                {title}
            </span>
        </RadixCheckbox.Root>
    );
};
