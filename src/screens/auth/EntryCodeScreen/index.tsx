import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EntryCodeScreenNavigationProp} from '../../../interfaces/navigation.interface';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  usePhoneVerifyMutation,
  usePhoneResendMutation,
} from '../../../redux/services/mobileApi';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../redux/slices/userSlice';

const EntryCodeScreen = () => {
  const navigation = useNavigation<EntryCodeScreenNavigationProp>();
  const route = useRoute();
  const {phoneNumber} = route.params as {phoneNumber: string};
  const dispatch = useDispatch();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [phoneVerify] = usePhoneVerifyMutation();
  const [phoneResend] = usePhoneResendMutation();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = useCallback(
    (value: string, index: number) => {
      if (value.length > 1) {
        // Handle paste operation
        const pastedCode = value.slice(0, 6).split('');
        const newCode = [...code];

        pastedCode.forEach((char, i) => {
          if (index + i < 6 && /^\d$/.test(char)) {
            newCode[index + i] = char;
          }
        });

        setCode(newCode);

        // Focus on next empty input or last input
        const nextIndex = Math.min(index + pastedCode.length, 5);
        inputRefs.current[nextIndex]?.focus();

        if (error) setError('');
        return;
      }

      // Handle single character input
      if (/^\d$/.test(value) || value === '') {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value !== '' && index < 5) {
          inputRefs.current[index + 1]?.focus();
        }

        if (error) setError('');
      }
    },
    [code, error],
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === 'Backspace' && code[index] === '' && index > 0) {
        // Focus previous input on backspace
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code],
  );

  const handleVerify = useCallback(async () => {
    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      setError('Lütfen 6 haneli kodu eksiksiz giriniz');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await phoneVerify({
        phone: phoneNumber,
        code: verificationCode,
      }).unwrap();

      if (result.success) {
        // Update Redux state with user and token (this will also save to storage)
        dispatch(
          loginSuccess({
            user: result.data.user,
            token: result.data.token,
          }),
        );

        // Navigation will be handled by Router based on authLogin state
      } else {
        setError(result.message || 'Doğrulama kodu geçersiz');
      }
    } catch (err: any) {
      console.error('Verification error:', err);

      if (err.status === 400) {
        setError('Geçersiz veya süresi dolmuş kod');
      } else if (err.status === 401) {
        setError('Hesabınız deaktif durumda');
      } else {
        setError(err.data?.message || 'Doğrulama sırasında bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  }, [code, phoneNumber, phoneVerify, dispatch]);

  const handleResend = useCallback(async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setError('');

    try {
      const result = await phoneResend({
        phone: phoneNumber,
      }).unwrap();

      if (result.success) {
        setTimer(60);
        setCanResend(false);
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();

        Alert.alert('Başarılı', 'Doğrulama kodu yeniden gönderildi');
      } else {
        setError(result.message || 'Kod gönderilemedi');
      }
    } catch (err: any) {
      console.error('Resend error:', err);

      if (err.status === 429) {
        setError('Çok sık kod talebi. Lütfen bekleyiniz.');
      } else if (err.status === 404) {
        setError('Telefon numarası bulunamadı');
      } else {
        setError(err.data?.message || 'Kod gönderilemedi');
      }
    } finally {
      setIsResending(false);
    }
  }, [canResend, isResending, phoneNumber, phoneResend]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const formatPhoneNumber = (phone: string) => {
    // Format +905551234567 to +90 555 123 45 67
    const cleaned = phone.replace(/\D/g, '');
    const countryCode = cleaned.substring(0, 2);
    const area = cleaned.substring(2, 5);
    const first = cleaned.substring(5, 8);
    const second = cleaned.substring(8, 10);
    const third = cleaned.substring(10, 12);

    return `+${countryCode} ${area} ${first} ${second} ${third}`;
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={20}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>📱</Text>
        </View>
        <Text style={styles.title}>Doğrulama Kodu</Text>
        <Text style={styles.subtitle}>
          Size gönderilen 6 haneli doğrulama kodunu giriniz
        </Text>
        <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneNumber)}</Text>
      </View>

      {/* Code Input */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Doğrulama Kodu</Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[styles.codeInput, digit !== '' && styles.codeInputFilled]}
              value={digit}
              onChangeText={value => handleCodeChange(value, index)}
              onKeyPress={({nativeEvent}) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={6} // Allow paste operation
              selectTextOnFocus={true}
              editable={!isLoading}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            (!isCodeComplete || isLoading) && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={!isCodeComplete || isLoading}
          activeOpacity={0.8}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.verifyButtonText}>Doğrula</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Resend Code */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Kodu almadınız mı?</Text>

        {canResend ? (
          <TouchableOpacity
            style={[
              styles.resendButton,
              isResending && styles.resendButtonDisabled,
            ]}
            onPress={handleResend}
            disabled={isResending}
            activeOpacity={0.7}>
            {isResending ? (
              <ActivityIndicator color="#25D366" size="small" />
            ) : (
              <Text style={styles.resendButtonText}>Yeniden Gönder</Text>
            )}
          </TouchableOpacity>
        ) : (
          <Text style={styles.timer}>
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}{' '}
            saniye sonra
          </Text>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EntryCodeScreen;
