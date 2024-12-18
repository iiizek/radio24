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
					paddingTop: 0,
					height: 54,
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					fontFamily: Fonts.regular,
					marginTop: 0,
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
				headerStatusBarHeight: -8,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarIcon: ({ color }) => <RadioIcon size={24} color={color} />,
					tabBarLabel: 'Потоки',
					headerTitle: 'РАДИО24 - Яркие моменты вместе! 🔥',
					headerTitleStyle: {
						fontSize: 16,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
			<Tabs.Screen
				name='favorites'
				options={{
					tabBarIcon: ({ color }) => <HeartIcon size={24} color={color} />,
					tabBarLabel: 'Избранное',
					headerTitle: 'Любимые потоки ❤️‍🔥',
					headerTitleStyle: {
						fontSize: 18,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
			<Tabs.Screen
				name='contacts'
				options={{
					tabBarIcon: ({ color }) => <InfoIcon size={24} color={color} />,
					tabBarLabel: 'Контакты',
					headerTitle: 'Контактная информация',
					headerTitleStyle: {
						fontSize: 18,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
