import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

type CheckboxProps = {
    title: string;
};
export const Checkbox: React.FC<CheckboxProps> = ({ title }) => {
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
                    "font-semibold text-xl leading-tight text-white",
                    "group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400",
                ].join(" ")}
            >
                {title}
            </span>
        </RadixCheckbox.Root>
    );
};
