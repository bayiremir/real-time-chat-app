import {StyleSheet} from 'react-native';
import {Fonts} from '../../../interfaces/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Helvetica,
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#25D366',
    fontFamily: Fonts.Helvetica,
    marginTop: 4,
  },
  codeContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  codeLabel: {
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.Helvetica,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  codeInputFocused: {
    borderColor: '#25D366',
    backgroundColor: '#FFFFFF',
  },
  codeInputFilled: {
    borderColor: '#25D366',
    backgroundColor: '#F0FDF4',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  verifyButton: {
    backgroundColor: '#25D366',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  verifyButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.Helvetica,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    color: '#25D366',
    fontSize: 14,
    fontFamily: Fonts.Helvetica,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  timer: {
    fontSize: 14,
    color: '#EF4444',
    fontFamily: Fonts.Helvetica,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#25D366',
    fontFamily: Fonts.Helvetica,
  },
});
