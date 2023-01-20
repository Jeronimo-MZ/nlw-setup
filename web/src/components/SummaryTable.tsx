import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDateSizes = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDateSizes - summaryDates.length;
export const SummaryTable = () => {
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
    console.log({ summaryDates, amountOfDaysToFill });
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={`${day}-${index}`}
                        className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map((date) => (
                    <HabitDay key={date.toString()} />
                ))}
                {amountOfDaysToFill > 0 &&
                    Array.from({ length: amountOfDaysToFill }).map((_, idx) => (
                        <div
                            key={`${idx}`}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-900 rounded-lg opacity-40 cursor-not-allowed"
                        ></div>
                    ))}
            </div>
        </div>
    );
};
