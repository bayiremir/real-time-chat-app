import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 2,
    paddingHorizontal: 8,
    width: '100%',
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  lastMessage: {
    marginBottom: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  ownBubble: {
    backgroundColor: '#dcf8c6', // WhatsApp own message green
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 2,
  },
  dimmedMessage: {
    opacity: 0.3,
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
    marginTop: 4,
  },
  ownMessageFooter: {
    justifyContent: 'flex-end',
  },
  otherMessageFooter: {
    justifyContent: 'flex-start',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
  },
  ownMessageTime: {
    color: '#666666',
  },
  otherMessageTime: {
    color: '#999999',
  },
  messageStatus: {
    marginLeft: 4,
  },
  fileContainer: {
    marginBottom: 8,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 4,
  },
  fileInfo: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  fileName: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: '#303030',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
    color: '#666666',
  },
});
