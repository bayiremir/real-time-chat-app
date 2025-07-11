import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  membersContainer: {
    flex: 1,
    marginBottom: 20,
  },
  selectedMembersContainer: {
    maxHeight: 50,
    marginBottom: 15,
  },
  selectedMember: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedMemberText: {
    color: 'white',
    fontSize: 14,
    marginRight: 6,
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: '#f9f9f9',
  },
  selectedContactItem: {
    backgroundColor: '#e8f5e8',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  contactPhone: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    marginTop: 2,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
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
    color: 'gray',
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
    color: 'gray',
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  membersSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: 24,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
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
  iconContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 10,
    borderRadius: 50,
  },
  // ContactSelectionBottomSheet için yeni style'lar
  selectedMembersHorizontalContainer: {
    maxHeight: 50,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  selectedMemberChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    maxWidth: 120,
  },
  selectedMemberChipText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 6,
    flex: 1,
  },
  doneButton: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
  },
  // CreateListBottomSheet için üye gösterimi
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  memberPhone: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    marginTop: 2,
  },
  removeMemberButton: {
    padding: 8,
  },
  // Avatar styles
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
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  // Add member button styles
  addMemberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addMemberIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addMemberText: {
    fontSize: 16,
    color: '#25D366',
    fontFamily: Fonts.Helvetica,
  },
  // Contact avatar styles
  contactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  contactAvatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  // Chip avatar styles
  chipAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  chipAvatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
