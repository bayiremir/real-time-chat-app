import {StyleSheet} from 'react-native';
import {Fonts} from '../../../../interfaces/fonts.enum';
import {COLORS} from '../../../../constants/COLORS';

export const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: COLORS.backgroundColor,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.backgroundColor,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 17,
    fontFamily: Fonts.Helvetica,
    color: 'black',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: Fonts.Helvetica,
    color: '#000',
    fontWeight: '600',
  },
  headerCount: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginTop: 1,
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  disabledCreateButton: {
    opacity: 0.5,
  },
  createText: {
    fontSize: 17,
    fontFamily: Fonts.Helvetica,
    color: '#007AFF',
    fontWeight: '600',
  },
  disabledCreateText: {
    color: '#8E8E93',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#000',
    marginLeft: 8,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  infoText: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 18,
  },
  contactsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  contactsList: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteColor,
    borderBottomColor: COLORS.dirtyColor,
    borderRadius: 10,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  defaultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    fontWeight: '600',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#000',
    fontWeight: '400',
  },
  contactBio: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: COLORS.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.whiteColor,
  },
  alphabetIndex: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  alphabetItem: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetText: {
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
    color: '#007AFF',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
