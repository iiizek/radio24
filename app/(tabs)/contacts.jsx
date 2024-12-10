import {
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	Image,
} from 'react-native';
import { Link } from 'expo-router';

import CurrentStream from '../../components/CurrentStream';
import {
	Link2Icon,
	MapPinIcon,
	MailIcon,
	ShieldCheckIcon,
} from 'lucide-react-native';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import theme from '../../utils/colorScheme';

const ContactsScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Link asChild href='https://radio24.ru'>
					<TouchableNativeFeedback>
						<View style={styles.item}>
							<Link2Icon size={32} color={Colors['brand-800']} />
							<Text style={styles.itemText}>radio24.ru</Text>
						</View>
					</TouchableNativeFeedback>
				</Link>

				<View style={styles.item}>
					<MapPinIcon size={32} color={Colors['brand-800']} />
					<Text style={styles.itemText}>
						Москва, Пренесенская набережная, 2
					</Text>
				</View>

				<Link asChild href='mailto:info@wowmusic.ru'>
					<TouchableNativeFeedback>
						<View style={styles.item}>
							<MailIcon size={32} color={Colors['brand-800']} />
							<Text style={styles.itemText}>Отправить сообщение</Text>
						</View>
					</TouchableNativeFeedback>
				</Link>

				<Link asChild href='https://vyshka24.ru/backend/privacy.php'>
					<TouchableNativeFeedback>
						<View style={styles.item}>
							<ShieldCheckIcon size={32} color={Colors['brand-800']} />
							<Text style={styles.itemText}>Политика конфиденциальности</Text>
						</View>
					</TouchableNativeFeedback>
				</Link>

				<Image
					style={styles.logo}
					source={require('../../assets/radio24.png')}
				></Image>
			</View>

			<CurrentStream />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 12,
		backgroundColor:
			theme === 'dark' ? Colors['theme-950'] : Colors['theme-50'],
	},

	wrapper: {
		flex: 1,
		gap: 24,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},

	item: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 24,
		width: '100%',
		paddingInline: 24,
		paddingBlock: 6,
	},

	itemText: {
		fontFamily: Fonts.regular,
		fontSize: 20,
		color: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
		flex: 1,
		textAlign: 'left',
	},

	logo: {
		flex: 1,
		width: '60%',
		alignSelf: 'center',
		resizeMode: 'contain',
	},
});

export default ContactsScreen;
