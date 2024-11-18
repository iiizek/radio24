import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';

const ContactsScreen = () => {
	const colorScheme = useColorScheme();

	return (
		<View
			style={{
				...styles.container,
				backgroundColor:
					colorScheme === 'dark' ? Colors['theme-950'] : Colors['theme-50'],
			}}
		>
			<FlatList />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 24,
		flex: 1,
	},
});

export default ContactsScreen;
