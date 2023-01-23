import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDateSizes = 15 * 5; // 18 weeks
const amountOfDaysToFill =
    minimumSummaryDateSizes - datesFromYearBeginning.length;

export type SummaryDate = {
    id: string;
    date: string;
    amount: number;
    completed: number;
};

export const Home = () => {
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [summary, setSummary] = useState<SummaryDate[]>([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get("/summary");
            setSummary(data);
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Ops!",
                "Não foi possível carregar o sumário de hábitos"
            );
        } finally {
            setIsLoading(false);
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (isLoading) return <Loading />;
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {daysOfWeek.map((day, index) => (
                    <Text
                        key={`${day}-${index}`}
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        style={{ width: DAY_SIZE }}
                    >
                        {day}
                    </Text>
                ))}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                <View className="flex-row flex-wrap">
                    {datesFromYearBeginning.map((date) => {
                        const dayInSummary = summary.find((day) =>
                            dayjs(day.date).isSame(date, "day")
                        );
                        return (
                            <HabitDay
                                completed={dayInSummary?.completed}
                                amount={dayInSummary?.amount}
                                date={date}
                                key={date.toISOString()}
                                onPress={() =>
                                    navigate("habit", { date: date.toString() })
                                }
                            />
                        );
                    })}
                    {amountOfDaysToFill > 0 &&
                        Array.from({ length: amountOfDaysToFill }).map(
                            (_, idx) => (
                                <View
                                    key={idx}
                                    className="bg-zinc-700 border-2 m-1 border-zinc-800 rounded-lg opacity-40"
                                    style={{
                                        width: DAY_SIZE,
                                        height: DAY_SIZE,
                                    }}
                                />
                            )
                        )}
                </View>
            </ScrollView>
        </View>
    );
};
