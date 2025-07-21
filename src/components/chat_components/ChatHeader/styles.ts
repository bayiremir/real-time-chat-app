import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7EA',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#25D366',
    borderWidth: 2,
    borderColor: '#075e54',
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: Fonts.Helvetica,
    color: '#000000',
    marginBottom: 2,
  },
  status: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: '#000000',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 5,
    padding: 8,
  },
});
