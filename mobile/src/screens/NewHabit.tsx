import { useState } from "react";
import {
    Alert,
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
import { api } from "../lib/axios";

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
    const [title, setTitle] = useState("");

    const createNewHabit = async () => {
        try {
            if (!title.trim() || !weekDays.length) {
                return Alert.alert(
                    "Novo Hábito",
                    "Informe o nome do hábito e escolha a periodicidade"
                );
            }
            await api.post("habits", { title, weekDays });
            setTitle("");
            setWeekDays([]);
            Alert.alert("Novo Hábito", "Hábito Criado com sucesso!");
        } catch (error) {
            console.log(error);
            Alert.alert("Oops!", "Ocorreu um erro ao criar o hábito!");
        }
    };

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
                    onChangeText={setTitle}
                    value={title}
                    placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-3 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
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
                    onPress={createNewHabit}
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
