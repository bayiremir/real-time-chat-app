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
import {RegisterScreenNavigationProp} from '../../../interfaces/navigation.interface';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePhoneRegisterMutation} from '../../../redux/services/mobileApi';

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string>('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const [phoneRegister] = usePhoneRegisterMutation();

  const validateForm = useCallback(() => {
    const newErrors = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    };

    if (!firstName.trim()) {
      newErrors.firstName = 'İsim alanı zorunludur';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Soyisim alanı zorunludur';
    }

    if (!phoneNumber.trim()) {
      newErrors.phone = 'Telefon numarası zorunludur';
    } else {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz';
      }
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  }, [firstName, lastName, phoneNumber, email]);

  const handleRegister = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formattedPhone = `+90${phoneNumber.replace(/\s/g, '')}`;

      const result = await phoneRegister({
        phone: formattedPhone,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim() || undefined,
      }).unwrap();

      if (result.success) {
        Alert.alert(
          'Kayıt Başarılı',
          'Hesabınız oluşturuldu. Telefon numaranızı doğrulamak için SMS kodu gönderildi.',
          [
            {
              text: 'Tamam',
              onPress: () =>
                navigation.navigate('EntryCodeScreen', {
                  phoneNumber: formattedPhone,
                }),
            },
          ],
        );
      } else {
        Alert.alert('Hata', result.message || 'Kayıt olurken bir hata oluştu');
      }
    } catch (err: any) {
      console.error('Register error:', err);

      if (err.status === 409) {
        Alert.alert('Hata', 'Bu telefon numarası zaten kayıtlı');
      } else if (err.status === 400) {
        Alert.alert('Hata', 'Geçersiz bilgiler. Lütfen kontrol edin.');
      } else {
        Alert.alert(
          'Hata',
          err.data?.message || 'Kayıt olurken bir hata oluştu',
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    firstName,
    lastName,
    phoneNumber,
    email,
    validateForm,
    phoneRegister,
    navigation,
  ]);

  const handleLogin = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  const clearError = useCallback((field: string) => {
    setErrors(prev => ({...prev, [field]: ''}));
  }, []);

  const isButtonDisabled =
    !firstName.trim() || !lastName.trim() || !phoneNumber.trim() || isLoading;

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
        <Text style={styles.welcomeText}>Hesap Oluştur</Text>
        <Text style={styles.subtitleText}>
          Yeni hesap oluşturmak için bilgilerinizi giriniz
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* First Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>İsim</Text>
          <TouchableOpacity
            style={[
              styles.inputField,
              focusedInput === 'firstName' && styles.inputFieldFocused,
            ]}
            activeOpacity={1}
            onPress={() => firstNameRef.current?.focus()}>
            <TextInput
              ref={firstNameRef}
              style={styles.textInput}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                clearError('firstName');
              }}
              placeholder="İsminizi giriniz"
              placeholderTextColor="#9CA3AF"
              autoComplete="given-name"
              textContentType="givenName"
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput('')}
              editable={!isLoading}
              selectTextOnFocus={true}
            />
          </TouchableOpacity>
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}
        </View>

        {/* Last Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Soyisim</Text>
          <TouchableOpacity
            style={[
              styles.inputField,
              focusedInput === 'lastName' && styles.inputFieldFocused,
            ]}
            activeOpacity={1}
            onPress={() => lastNameRef.current?.focus()}>
            <TextInput
              ref={lastNameRef}
              style={styles.textInput}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                clearError('lastName');
              }}
              placeholder="Soyisminizi giriniz"
              placeholderTextColor="#9CA3AF"
              autoComplete="family-name"
              textContentType="familyName"
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput('')}
              editable={!isLoading}
              selectTextOnFocus={true}
            />
          </TouchableOpacity>
          {errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <TouchableOpacity
            style={[
              styles.phoneContainer,
              focusedInput === 'phone' && styles.phoneContainerFocused,
            ]}
            activeOpacity={1}
            onPress={() => phoneRef.current?.focus()}>
            <Text style={styles.countryCode}>+90</Text>
            <TextInput
              ref={phoneRef}
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
                clearError('phone');
              }}
              placeholder="555 123 4567"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput('')}
              editable={!isLoading}
              selectTextOnFocus={true}
            />
          </TouchableOpacity>
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}
        </View>

        {/* Email (Optional) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-posta (Opsiyonel)</Text>
          <TouchableOpacity
            style={[
              styles.inputField,
              focusedInput === 'email' && styles.inputFieldFocused,
            ]}
            activeOpacity={1}
            onPress={() => emailRef.current?.focus()}>
            <TextInput
              ref={emailRef}
              style={styles.textInput}
              value={email}
              onChangeText={text => {
                setEmail(text);
                clearError('email');
              }}
              placeholder="ornek@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
              editable={!isLoading}
              selectTextOnFocus={true}
            />
          </TouchableOpacity>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.registerButton,
            isButtonDisabled && styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={isButtonDisabled}
          activeOpacity={0.8}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>veya</Text>
        <View style={styles.orLine} />
      </View>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Zaten hesabınız var mı?</Text>
        <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
          <Text style={styles.loginLink}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
