import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  lastActivity: {
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
    color: '#8696a0',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: '#8696a0',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: '#ffffff',
  },
});
