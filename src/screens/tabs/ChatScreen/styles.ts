import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontFamily: Fonts.Bold,
    fontSize: 24,
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
