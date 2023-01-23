import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";

type Params = {
    date: string;
};

type Day = {
    possibleHabits: { id: string; title: string }[];
    completedHabits: string[];
};

export const Habit = () => {
    const { params } = useRoute();
    const { date } = params as Params;
    const [day, setDay] = useState<Day>();

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format("dddd");
    const dayAndMonth = parsedDate.format("DD/MM");

    useEffect(() => {
        api.get("/day", { params: { date } }).then((response) => {
            setDay(response.data);
        });
    }, []);

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
                    {day?.possibleHabits.map((habit) => {
                        return (
                            <Checkbox
                                key={habit.id}
                                title={habit.title}
                                checked={day.completedHabits.includes(habit.id)}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};
