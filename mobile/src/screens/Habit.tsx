import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { ProgressBar } from "../components/ProgressBar";

type Params = {
    date: string;
};

export const Habit = () => {
    const { params } = useRoute();
    const { date } = params as Params;
    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format("dddd");
    const dayAndMonth = parsedDate.format("DD/MM");
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView>
                <BackButton />
                <Text className="text-zinc-400 font-bold text-base capitalize">
                    {dayOfWeek}
                </Text>
                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={50} />
                <View className="mt-6">
                    <Checkbox title="Beber Água" />
                    <Checkbox title="Fazer Exercícios Físicos" />
                </View>
            </ScrollView>
        </View>
    );
};
