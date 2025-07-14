import {StyleSheet} from 'react-native';
import {Fonts} from '../../../../interfaces/fonts.enum';

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
    padding: 12,
    minHeight: 60,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  listInfo: {},
  listName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#333',
    marginBottom: 2,
  },
  memberCount: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
  },
  dragHandle: {
    alignItems: 'center',
    marginLeft: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
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
});
