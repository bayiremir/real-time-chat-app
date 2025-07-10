import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  headerRight: {
    padding: 5,
    backgroundColor: '#25D366',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
