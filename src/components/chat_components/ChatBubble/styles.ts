import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingHorizontal: 8,
    width: '100%',
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ownBubble: {
    backgroundColor: '#dcf8c6',
    borderBottomRightRadius: 3,
    marginLeft: 50,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 0,
    marginRight: 50,
  },
  senderName: {
    fontSize: 13,
    fontFamily: Fonts.Bold,
    color: '#25D366',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    lineHeight: 20,
    marginBottom: 4,
  },
  ownMessageText: {
    color: '#303030',
  },
  otherMessageText: {
    color: '#303030',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  messageTime: {
    fontSize: 11,
    fontFamily: Fonts.Helvetica,
    marginRight: 4,
  },
  ownMessageTime: {
    color: '#7A7A7A',
  },
  otherMessageTime: {
    color: '#9E9E9E',
  },
  messageStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  doubleCheckIcon: {
    marginLeft: -8,
  },
});
