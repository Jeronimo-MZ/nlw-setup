import { TouchableOpacity, View, Text } from "react-native";
import colors from "tailwindcss/colors";
import Logo from "../../assets/logo.svg";
import { Feather } from "@expo/vector-icons";

export const Header = () => {
    return (
        <View className="w-full flex-row justify-between items-center">
            <Logo />
            <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row h-11 border border-violet-500 rounded-lg items-center px-4"
            >
                <Feather name="plus" color={colors.violet[500]} size={20} />
                <Text className="text-white font-semibold text-base ml-3">
                    Novo
                </Text>
            </TouchableOpacity>
        </View>
    );
};
