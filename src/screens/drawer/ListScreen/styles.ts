import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';
import {COLORS} from '../../../constants/COLORS';

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
  title: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 12,
    borderBottomColor: COLORS.dirtyColor,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: Fonts.Light,
  },
  descriptionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  listItemIcon: {
    padding: 5,
    backgroundColor: COLORS.greenColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
