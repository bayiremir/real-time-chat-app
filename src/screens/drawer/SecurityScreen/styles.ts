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
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    lineHeight: 16,
    marginHorizontal: 40,
    marginBottom: 10,
  },
});
