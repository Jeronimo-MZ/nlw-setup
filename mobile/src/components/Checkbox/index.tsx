import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, {
    RollInLeft,
    RollOutRight,
    RollInRight,
    RollOutLeft,
} from "react-native-reanimated";

type CheckboxProps = TouchableOpacityProps & {
    title: string;
    checked?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    title,
    ...rest
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row mb-2 items-center"
            {...rest}
        >
            {checked ? (
                <Animated.View
                    className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
                    entering={RollInLeft}
                    exiting={RollOutRight}
                >
                    <Feather name="check" size={20} color={colors.white} />
                </Animated.View>
            ) : (
                <Animated.View
                    className="h-8 w-8 bg-zinc-900 rounded-lg"
                    entering={RollInRight}
                    exiting={RollOutLeft}
                ></Animated.View>
            )}
            <Text className="text-white ml-3 font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};
