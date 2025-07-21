import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'column',
  },
  headerText: {
    fontFamily: Fonts.Bold,
    fontSize: 24,
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listsContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listsContentContainer: {
    paddingHorizontal: 8,
  },
  listItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  selectedListItem: {
    backgroundColor: 'rgba(7, 94, 84, 0.1)',
  },
  listItemText: {
    fontFamily: Fonts.Helvetica,
    fontSize: 14,
    color: '#000',
  },
  selectedListItemText: {
    color: '#075e54',
    fontFamily: Fonts.Bold,
  },
  chatsContainer: {},
});
