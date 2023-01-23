import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDateSizes = 15 * 5; // 18 weeks
const amountOfDaysToFill =
    minimumSummaryDateSizes - datesFromYearBeginning.length;

export const Home = () => {
    const { navigate } = useNavigation();
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
                    {datesFromYearBeginning.map((day) => (
                        <HabitDay
                            key={day.toISOString()}
                            onPress={() => navigate("habit", { date: day })}
                        />
                    ))}
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
