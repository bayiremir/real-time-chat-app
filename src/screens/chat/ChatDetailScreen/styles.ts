import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5', // WhatsApp chat background
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  messagesContainer: {
    paddingVertical: 8,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
