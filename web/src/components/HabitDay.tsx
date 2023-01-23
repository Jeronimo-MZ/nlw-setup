import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";
import { HabitsList as HabitList } from "./HabitList";
import { ProgressBar } from "./ProgressBar";

type HabitDayProps = {
    defaultCompleted?: number;
    amount?: number;
    date: Date;
};

function getCompletedBorderColors(completed: number) {
    if (completed <= 0) return "bg-zinc-900 border-zinc-900";
    else if (completed <= 20) "bg-violet-900 border-violet-800";
    else if (completed <= 40) return "bg-violet-800 border-violet-700";
    else if (completed <= 60) return "bg-violet-700 border-violet-600";
    else if (completed <= 80) return "bg-violet-600 border-violet-500";
    return "bg-violet-500 border-violet-400";
}

export const HabitDay: React.FC<HabitDayProps> = ({
    amount = 0,
    defaultCompleted = 0,
    date,
}) => {
    const [completed, setCompleted] = useState(defaultCompleted);
    const completedPercentage =
        amount > 0 ? Math.round((completed / amount) * 100) : 0;
    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format("dddd");
    const dayAndMonth = parsedDate.format("DD/MM");

    const handleCompletedChange = (newCompleted: number) => {
        setCompleted(newCompleted);
    };
    return (
        <Popover.Root>
            <Popover.Trigger
                className={`w-10 h-10 border-2 rounded-lg ${getCompletedBorderColors(
                    completedPercentage
                )}`}
            />
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounder-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400 capitalize">
                        {dayOfWeek}
                    </span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">
                        {dayAndMonth}
                    </span>

                    <ProgressBar progress={completedPercentage} />
                    <HabitList
                        date={date}
                        onCompletedChange={handleCompletedChange}
                    />

                    <Popover.Arrow
                        className="fill-zinc-900"
                        height={8}
                        width={16}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
