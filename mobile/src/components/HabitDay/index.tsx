import { Dimensions, TouchableOpacity, View } from "react-native";

const DAYS_IN_ONE_WEEK = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
    Dimensions.get("screen").width / DAYS_IN_ONE_WEEK -
    (SCREEN_HORIZONTAL_PADDING + 5);

export const HabitDay = () => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-zinc-700 border-2 m-1 border-zinc-800 rounded-lg"
            style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
            }}
        />
    );
};
