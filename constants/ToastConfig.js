import Toast from 'react-native-root-toast';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import theme from '../utils/colorScheme';

const toastConfig = {
	duration: Toast.durations.SHORT,
	position: Toast.positions.BOTTOM,
	shadow: true,
	animation: true,
	hideOnPress: true,
	backgroundColor: theme === 'dark' ? Colors['theme-50'] : Colors['theme-950'],
	textStyle: {
		fontFamily: Fonts.regular,
		color: theme === 'dark' ? Colors['theme-950'] : Colors['theme-50'],
	},
};

export default toastConfig;
