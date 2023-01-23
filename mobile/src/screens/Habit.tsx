import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { EmptyHabitsMessage } from "../components/EmptyHabitsMessage";
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";
import { calculatePercentage } from "../utils/calculatePercentage";

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
    const [isLoading, setIsLoading] = useState(true);

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format("dddd");
    const dayAndMonth = parsedDate.format("DD/MM");
    const isDateInPast = parsedDate
        .endOf("day")
        .isBefore(dayjs().startOf("day"));

    async function fetchData() {
        try {
            setIsLoading(true);
            await api.get("/day", { params: { date } }).then((response) => {
                setDay(response.data);
            });
        } catch (error) {
            Alert.alert(
                "Oops!",
                "Não Foi possível carregar as informações dos hábitos"
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggleHabit = async (habitId: string) => {
        try {
            await api.patch(`/habits/${habitId}/toggle`);
            const isCompleted = day?.completedHabits.includes(habitId);
            let completed: string[];
            if (isCompleted) {
                completed = day!.completedHabits.filter(
                    (completedId) => completedId !== habitId
                );
            } else {
                completed = [...day!.completedHabits, habitId];
            }
            setDay((prev) => ({
                possibleHabits: prev!.possibleHabits,
                completedHabits: completed,
            }));
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Oops!",
                "Ocorreu um erro ao atualizar o status do hábito"
            );
        }
    };

    if (isLoading) return <Loading />;
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
                <ProgressBar
                    progress={calculatePercentage(
                        day?.completedHabits.length ?? 0,
                        day?.possibleHabits.length ?? 0
                    )}
                />
                <View className={`mt-6 ${isDateInPast ? "opacity-50" : ""}`}>
                    {day?.completedHabits.length ? (
                        <>
                            {day?.possibleHabits.map((habit) => {
                                return (
                                    <Checkbox
                                        key={habit.id}
                                        title={habit.title}
                                        checked={day.completedHabits.includes(
                                            habit.id
                                        )}
                                        onPress={() =>
                                            handleToggleHabit(habit.id)
                                        }
                                        disabled={isDateInPast}
                                    />
                                );
                            })}
                            {isDateInPast && (
                                <Text className="text-white font-medium mt-10 text-center">
                                    Você não pode editar hábitos de uma data
                                    passada!
                                </Text>
                            )}
                        </>
                    ) : (
                        <EmptyHabitsMessage />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
