import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/COLORS';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  leftContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  chatBubbleContainer: {
    flex: 1,
    marginLeft: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  timeText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
    color: '#808080',
    textAlign: 'right',
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    top: 30,
  },
  editButtonText: {
    color: 'black',
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
  },
  selectedContainer: {
    backgroundColor: '#e8f5e8',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.greenColor,
    borderColor: COLORS.greenColor,
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fonts.Helvetica,
  },
  deleteToolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: Fonts.Helvetica,
  },
  flatListWithToolbar: {
    paddingBottom: 90,
  },
  deleteButtonIcon: {
    paddingBottom: 10,
  },
});
