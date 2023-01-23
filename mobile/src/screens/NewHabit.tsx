import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const availableWeekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
];

export const NewHabit = () => {
    const [weekDays, setWeekDays] = useState<number[]>([]);

    function toggleWeekDay(index: number) {
        if (weekDays.includes(index)) {
            setWeekDays((prev) => prev.filter((day) => day !== index));
        } else {
            setWeekDays((prev) => [...prev, index]);
        }
    }
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>
                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>
                <TextInput
                    placeholder="Ex.: Exercicios, Dormir bem, estudar,..."
                    placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-3 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>
                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => toggleWeekDay(index)}
                    />
                ))}

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full items-center justify-center flex-row bg-green-600 rounded-lg mt-6 h-14"
                >
                    <Feather name="check" color={colors.white} size={20} />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
