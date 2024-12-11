import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { RootSiblingParent } from 'react-native-root-siblings';
import { View } from 'react-native';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
	initialRouteName: 'index',
};

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[Fonts.bold]: require('../assets/fonts/HarmoniaSansProCyr-Bold.otf'),
		[Fonts.regular]: require('../assets/fonts/HarmoniaSansProCyr-Regular.otf'),
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
				<View style={{ flex: 1 }}>
					<RootSiblingParent>
						<View style={{ flex: 1 }}>
							<Stack>
								<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
								<Stack.Screen
									name='modal'
									options={{ presentation: 'modal', headerShown: false }}
								/>
							</Stack>
						</View>
					</RootSiblingParent>
				</View>
			</SafeAreaView>

			<StatusBar style='light' />
		</>
	);
}
