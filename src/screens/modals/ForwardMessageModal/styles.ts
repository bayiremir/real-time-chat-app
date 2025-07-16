import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';
import {COLORS} from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.backgroundColor,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
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
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: Fonts.Helvetica,
    color: '#000',
  },
  headerCount: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginTop: 1,
  },
  forwardButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledForwardButton: {
    backgroundColor: '#8E8E93',
    opacity: 0.5,
  },
  messagePreview: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  messagePreviewTitle: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginBottom: 8,
  },
  messageContent: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  messageText: {
    fontSize: 15,
    fontFamily: Fonts.Helvetica,
    color: '#000',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  starButton: {
    backgroundColor: '#FFF9E6',
  },
  shareButton: {
    backgroundColor: '#E6F3FF',
  },
  deleteButton: {
    backgroundColor: '#FFE6E6',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
    color: '#000',
    marginTop: 4,
    textAlign: 'center',
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
  contactsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.backgroundColor,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    marginBottom: 2,
  },
  selectedContactItem: {
    backgroundColor: '#E8F5E8',
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#000',
  },
  contactPhone: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginTop: 2,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
  },
});
