import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
    borderBottomColor: '#f0f0f0',
  },
  membersSection: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
    backgroundColor: '#25D366',
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
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 10,
    borderRadius: 50,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});
