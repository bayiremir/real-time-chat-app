import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';
import {COLORS} from '../../../constants/COLORS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'green',
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    textAlign: 'center',
    lineHeight: 16,
  },
  groupsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  groupsTitle: {
    fontSize: 18,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    marginBottom: 15,
    textAlign: 'center',
  },
  groupItem: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupName: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: 'gray',
    flex: 1,
  },
  groupMembersCount: {
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
    color: COLORS.greenColor,
  },
});
