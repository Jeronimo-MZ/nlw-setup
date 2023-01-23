import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Checkbox } from "./Checkbox";

const availableWeekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
];

export const NewHabitForm = () => {
    const [title, setTitle] = useState("");
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const createNewHabit = async (event: FormEvent) => {
        event.preventDefault();
        console.log({ title, weekDays });
    };
    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label className="font-semibold leading-tight" htmlFor="title">
                Qual seu comprometimento?
            </label>
            <input
                className="p-4 rounded-lg mt-12 bg-zinc-800 text-white placeholder:text-zinc-700"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex.: exercicios, dormir bem, ..."
                autoFocus
            />
            <label className="font-semibold leading-tight mt-4" htmlFor="">
                Qual a recorrência?
            </label>
            <div className="mt-3 flex flex-col gap-2">
                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox
                        title={weekDay}
                        key={weekDay}
                        onChange={(checked) => {
                            if (checked) {
                                setWeekDays((prev) => [...prev, index]);
                            } else {
                                setWeekDays((prev) =>
                                    prev.filter((weekDay) => weekDay !== index)
                                );
                            }
                        }}
                    />
                ))}
            </div>

            <button
                className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 duration-200"
                type="submit"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
};
