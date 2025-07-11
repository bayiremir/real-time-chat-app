import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '##F2F2F7',
  },
  content: {
    paddingHorizontal: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 12,
    borderBottomColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 16,
    fontFamily: Fonts.Light,
  },
  descriptionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  listItemIcon: {
    padding: 5,
    backgroundColor: '#25D366',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
