import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export const EmptyHabitsMessage = () => {
    const { navigate } = useNavigation();

    return (
        <Text className="text-zinc-400 text-base text-center">
            Você ainda não está monitorando nenhum hábito para este dia.{" "}
            <Text
                className="text-violet-400 text-base underline active:text-violet-500"
                onPress={() => navigate("new")}
            >
                Comece cadastrando um!
            </Text>
        </Text>
    );
};
