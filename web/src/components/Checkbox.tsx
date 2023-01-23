import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

type CheckboxProps = {
    title: string;
    defaultChecked?: boolean;
    crossWhenChecked?: boolean;
    textXL?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
};
export const Checkbox: React.FC<CheckboxProps> = ({
    title,
    crossWhenChecked = false,
    defaultChecked = false,
    checked,
    textXL = false,
    onChange,
    disabled,
}) => {
    return (
        <RadixCheckbox.Root
            className="flex items-center gap-3 group focus:outline-none"
            onCheckedChange={(checked) =>
                onChange && checked !== "indeterminate" && onChange(checked)
            }
            defaultChecked={defaultChecked}
            checked={checked}
            disabled={disabled}
        >
            <div
                className={[
                    "h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-700 border-2 border-zinc-800",
                    "group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-600 transition-colors",
                    "group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background",
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
