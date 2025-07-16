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
    marginVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 12,
    borderBottomColor: COLORS.dirtyColor,
  },
});
