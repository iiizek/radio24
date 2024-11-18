import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[Fonts.bold]: require('../assets/fonts/Raleway-Bold.ttf'),
		[Fonts.regular]: require('../assets/fonts/Raleway-Medium.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: Colors['brand-800'] }}>
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				</Stack>
			</SafeAreaView>

			<StatusBar style='light' />
		</>
	);
}