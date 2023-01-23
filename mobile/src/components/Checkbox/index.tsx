import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

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
                <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
                    <Feather name="check" size={20} color={colors.white} />
                </View>
            ) : (
                <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
            )}
            <Text className="text-white ml-3 font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};