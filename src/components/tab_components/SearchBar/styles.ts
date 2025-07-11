import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontFamily: Fonts.Helvetica,
  },
});
