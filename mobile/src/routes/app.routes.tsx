import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Habit } from "../screens/Habit";
import { Home } from "../screens/Home";
import { NewHabit } from "../screens/NewHabit";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
    const screens = [
        { name: "home", component: Home },
        { name: "habit", component: Habit },
        { name: "new", component: NewHabit },
    ];

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            {screens.map((screen) => (
                <Screen key={screen.name} {...screen} />
            ))}
        </Navigator>
    );
};
