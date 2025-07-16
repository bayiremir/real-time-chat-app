import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/COLORS';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
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
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightText: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
});
