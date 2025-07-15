import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenNavigationProp} from '../../../interfaces/navigation.interface';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePhoneLoginMutation} from '../../../redux/services/mobileApi';
import {ChatBubbleLeftIcon} from 'react-native-heroicons/outline';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const textInputRef = useRef<TextInput>(null);
  const [phoneLogin] = usePhoneLoginMutation();
  const validatePhoneNumber = useCallback((phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }, []);

  const handleLogin = useCallback(async () => {
    if (!phoneNumber.trim()) {
      setError('Lütfen telefon numaranızı giriniz');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Geçerli bir telefon numarası giriniz');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Format phone number with country code (+90 for Turkey)
      const formattedPhone = `+90${phoneNumber.replace(/\s/g, '')}`;

      const result = await phoneLogin({
        phone: formattedPhone,
      }).unwrap();

      if (result.success) {
        // Navigate to EntryCodeScreen with phone number
        navigation.navigate('EntryCodeScreen', {
          phoneNumber: formattedPhone,
        });
      } else {
        setError(result.message || 'Giriş yapılırken bir hata oluştu');
      }
    } catch (err: any) {
      console.error('Login error:', err);

      if (err.status === 404) {
        setError('Bu telefon numarası ile kayıtlı bir hesap bulunamadı');
      } else if (err.status === 401) {
        setError('Hesabınız deaktif durumda');
      } else if (err.status === 500) {
        setError('SMS gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      } else {
        setError(err.data?.message || 'Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber, validatePhoneNumber, phoneLogin, navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('RegisterScreen');
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      'Şifremi Unuttum',
      'Şifre sıfırlama özelliği yakında eklenecektir.',
      [{text: 'Tamam'}],
    );
  }, []);

  const isButtonDisabled = !phoneNumber.trim() || isLoading;

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardOpeningTime={250}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <ChatBubbleLeftIcon size={24} color="white" />
        </View>
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
        <Text style={styles.subtitleText}>
          Devam etmek için telefon numaranızı giriniz
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <TouchableOpacity
            style={[
              styles.phoneContainer,
              isFocused && styles.phoneContainerFocused,
            ]}
            activeOpacity={1}
            onPress={() => {
              textInputRef.current?.focus();
            }}>
            <Text style={styles.countryCode}>+90</Text>
            <TextInput
              ref={textInputRef}
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
                if (error) setError('');
              }}
              placeholder="555 123 4567"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              editable={!isLoading}
              selectTextOnFocus={true}
            />
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            isButtonDisabled && styles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={isButtonDisabled}
          activeOpacity={0.8}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={handleForgotPassword}
          activeOpacity={0.7}>
          <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>veya</Text>
        <View style={styles.orLine} />
      </View>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Hesabınız yok mu?</Text>
        <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
          <Text style={styles.registerLink}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
