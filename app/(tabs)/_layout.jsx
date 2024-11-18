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
					paddingInline: 32,
					paddingTop: 8,
					height: 72,
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					fontFamily: Fonts.regular,
					marginTop: 6,
					fontSize: 14,
					fontWeight: '500',
					transition: '0.2s ease-in-out',
				},
				headerStyle: {
					backgroundColor: Colors['brand-800'],
					borderBottomWidth: 0,
				},
				headerStatusBarHeight: 0,
				headerTitleStyle: {
					fontFamily: Fonts.bold,
					color: Colors['theme-50'],
				},
				headerTitleAlign: 'center',
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarIcon: ({ color }) => <RadioIcon size={32} color={color} />,
					tabBarLabel: 'Потоки',
					headerTitle: 'РАДИО24 - Яркие моменты вместе! 🔥',
				}}
			/>
			<Tabs.Screen
				name='favorites'
				options={{
					tabBarIcon: ({ color }) => <HeartIcon size={32} color={color} />,
					tabBarLabel: 'Избранное',
					headerTitle: 'Любимые потоки ❤️‍🔥',
				}}
			/>
			<Tabs.Screen
				name='contacts'
				options={{
					tabBarIcon: ({ color }) => <InfoIcon size={32} color={color} />,
					tabBarLabel: 'Контакты',
					headerTitle: 'Контактная информация',
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;