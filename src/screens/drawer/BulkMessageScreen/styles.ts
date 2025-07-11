import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
});
