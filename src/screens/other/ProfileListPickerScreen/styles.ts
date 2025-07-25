import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/COLORS';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  content: {
    paddingHorizontal: 15,
    marginHorizontal: 15,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 40,
    marginTop: 10,
    lineHeight: 20,
    fontFamily: Fonts.Helvetica,
  },
});
