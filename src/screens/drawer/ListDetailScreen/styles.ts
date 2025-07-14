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
    backgroundColor: COLORS.whiteColor,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: Fonts.Light,
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 30,
    borderBottomColor: COLORS.dirtyColor,
  },
  membersSection: {
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.dirtyColor,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: 24,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  addFirstMemberButton: {
    backgroundColor: COLORS.greenColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addFirstMemberText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconContainer: {
    backgroundColor: COLORS.dirtyColor,
    padding: 10,
    borderRadius: 50,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
});
