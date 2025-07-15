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
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  listItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'black',
    marginBottom: 2,
  },
  memberCount: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  dragHandle: {
    marginLeft: 15,
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
});
