import { Tabs } from 'expo-router';

import { RadioIcon, HeartIcon, InfoIcon } from 'lucide-react-native';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

const TabsLayout = () => {
	return (
		<Tabs
			initialRouteName='index'
			screenOptions={{
				tabBarActiveTintColor: Colors['theme-50'],
				tabBarInactiveTintColor: Colors['brand-300'],
				tabBarStyle: {
					backgroundColor: Colors['brand-800'],
					paddingHorizontal: 32,
					paddingTop: 2,
					height: 60,
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					fontFamily: Fonts.regular,
					marginTop: 4,
					fontSize: 12,
					fontWeight: '500',
					transition: '0.2s ease-in-out',
				},
				headerStyle: {
					backgroundColor: Colors['brand-800'],
					borderBottomWidth: 0,
				},
				headerStatusBarHeight: 0,
				headerTitleAlign: 'center',
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarIcon: ({ color }) => <RadioIcon size={28} color={color} />,
					tabBarLabel: 'Потоки',
					headerTitle: 'РАДИО24 - Яркие моменты вместе! 🔥',
					headerTitleStyle: {
						fontSize: 16,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
					headerStatusBarHeight: -16,
				}}
			/>
			<Tabs.Screen
				name='favorites'
				options={{
					tabBarIcon: ({ color }) => <HeartIcon size={28} color={color} />,
					tabBarLabel: 'Избранное',
					headerTitle: 'Любимые потоки ❤️‍🔥',
					headerTitleStyle: {
						fontSize: 16,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
			<Tabs.Screen
				name='contacts'
				options={{
					tabBarIcon: ({ color }) => <InfoIcon size={28} color={color} />,
					tabBarLabel: 'Контакты',
					headerTitle: 'Контактная информация',
					headerTitleStyle: {
						fontSize: 16,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
