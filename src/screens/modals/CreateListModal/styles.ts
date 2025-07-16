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
    color: '#25D366',
  },
  disabledCreateText: {
    color: '#8E8E93',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#000',
    backgroundColor: 'transparent',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    lineHeight: 18,
  },
  membersContainer: {
    flex: 1,
  },
  membersSection: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
  },
  addMemberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.whiteColor,
  },
  addMemberIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addMemberText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#000',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#E5E5E5',
    marginLeft: 68,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.whiteColor,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#000',
  },
  memberPhone: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: '#8E8E93',
    marginTop: 2,
  },
  removeMemberButton: {
    padding: 8,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  memberAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});
