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
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedListItem: {
    backgroundColor: '#075e54',
    borderColor: '#075e54',
  },
  listItemText: {
    fontFamily: Fonts.Helvetica,
    fontSize: 14,
    color: '#000',
  },
  selectedListItemText: {
    color: '#ffffff',
    fontFamily: Fonts.Bold,
  },
  chatsContainer: {},
});
