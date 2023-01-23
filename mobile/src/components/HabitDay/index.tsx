import dayjs from "dayjs";
import {
    Dimensions,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import { calculatePercentage } from "../../utils/calculatePercentage";

const DAYS_IN_ONE_WEEK = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
    Dimensions.get("screen").width / DAYS_IN_ONE_WEEK -
    (SCREEN_HORIZONTAL_PADDING + 5);

type HabitDayProps = TouchableOpacityProps & {
    completed?: number;
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
    completed = 0,
    date,
    ...props
}) => {
    const completedPercentage = calculatePercentage(completed, amount);
    const isToday = dayjs().isSame(date, "day");
    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.7}
            className={`bg-zinc-700 border-2 m-1 rounded-lg ${getCompletedBorderColors(
                completedPercentage
            )} ${isToday ? "border-white border-3" : ""}`}
            style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
            }}
        />
    );
};
