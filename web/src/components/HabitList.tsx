import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

type Day = {
    possibleHabits: { id: string; title: string }[];
    completedHabits: string[];
};

type HabitListProps = {
    date: Date;
    onCompletedChange: (completed: number) => void;
};
export const HabitsList = ({ date, onCompletedChange }: HabitListProps) => {
    const [day, setDay] = useState<Day>();
    useEffect(() => {
        api.get("/day", { params: { date } }).then((response) => {
            setDay(response.data);
            console.log(response.data);
        });
    }, []);

    const isDateInPast = dayjs(date)
        .endOf("day")
        .isBefore(dayjs().startOf("day"));

    const handleToggleHabit = async (habitId: string) => {
        await api.patch(`/habits/${habitId}/toggle`);
        const isCompleted = day?.completedHabits.includes(habitId);
        let completed: string[];
        if (isCompleted) {
            completed = day!.completedHabits.filter(
                (completedId) => completedId !== habitId
            );
        } else {
            completed = [...day!.completedHabits, habitId];
        }
        setDay((prev) => ({
            possibleHabits: prev!.possibleHabits,
            completedHabits: completed,
        }));
        onCompletedChange(completed.length);
    };
    return (
        <div className="mt-6 flex flex-col gap-3">
            {day?.possibleHabits.map((habit) => (
                <Checkbox
                    defaultChecked={day.completedHabits.includes(habit.id)}
                    disabled={isDateInPast}
                    onChange={() => handleToggleHabit(habit.id)}
                    crossWhenChecked
                    textXL
                    title={habit.title}
                    key={habit.id}
                />
            ))}
        </div>
    );
};
