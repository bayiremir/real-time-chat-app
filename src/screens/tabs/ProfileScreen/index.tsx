import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../redux/store';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useLogoutMutation,
} from '../../../redux/services/mobileApi';
import {updateUserProfile, logout} from '../../../redux/slices/userSlice';
import {styles} from './styles';

// Icons
import {
  PencilIcon,
  CameraIcon,
  ArrowLeftOnRectangleIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';
import {CheckIcon, XMarkIcon} from 'react-native-heroicons/solid';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.userSlice);
  const {data: profileData, refetch} = useGetProfileQuery();

  const [updateProfile, {isLoading: isUpdating}] = useUpdateProfileMutation();
  const [_uploadAvatar, {isLoading: isUploading}] = useUploadAvatarMutation();
  const [deleteAvatar, {isLoading: isDeleting}] = useDeleteAvatarMutation();
  const [logoutMutation, {isLoading: isLoggingOut}] = useLogoutMutation();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  const currentUser = profileData?.data || user;

  const handleEditBio = useCallback(() => {
    setIsEditingBio(true);
    setBioText(currentUser?.bio || '');
  }, [currentUser?.bio]);

  const handleSaveBio = useCallback(async () => {
    try {
      const result = await updateProfile({
        bio: bioText,
      }).unwrap();

      if (result.success) {
        dispatch(updateUserProfile({bio: bioText}));
        setIsEditingBio(false);
        refetch();
      }
    } catch (error: any) {
      Alert.alert('Hata', 'Bio güncellenirken bir hata oluştu');
    }
  }, [bioText, updateProfile, dispatch, refetch]);

  const handleCancelBio = useCallback(() => {
    setIsEditingBio(false);
    setBioText(currentUser?.bio || '');
  }, [currentUser?.bio]);

  const handleEditName = useCallback(() => {
    setIsEditingName(true);
    setFirstName(currentUser?.firstName || '');
    setLastName(currentUser?.lastName || '');
  }, [currentUser?.firstName, currentUser?.lastName]);

  const handleSaveName = useCallback(async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Hata', 'Ad ve soyad boş olamaz');
      return;
    }

    try {
      const result = await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }).unwrap();

      if (result.success) {
        dispatch(
          updateUserProfile({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          }),
        );
        setIsEditingName(false);
        refetch();
      }
    } catch (error: any) {
      Alert.alert('Hata', 'İsim güncellenirken bir hata oluştu');
    }
  }, [firstName, lastName, updateProfile, dispatch, refetch]);

  const handleCancelName = useCallback(() => {
    setIsEditingName(false);
    setFirstName(currentUser?.firstName || '');
    setLastName(currentUser?.lastName || '');
  }, [currentUser?.firstName, currentUser?.lastName]);

  const handleDeleteAvatar = useCallback(async () => {
    try {
      const result = await deleteAvatar().unwrap();
      if (result.success) {
        dispatch(updateUserProfile({avatar: undefined}));
        refetch();
      }
    } catch (error: any) {
      Alert.alert('Hata', 'Fotoğraf silinirken bir hata oluştu');
    }
  }, [deleteAvatar, dispatch, refetch]);

  const handleAvatarOptions = useCallback(() => {
    Alert.alert('Profil Fotoğrafı', 'Ne yapmak istiyorsunuz?', [
      {text: 'Fotoğraf Çek', onPress: () => console.log('Camera')},
      {text: 'Galeriden Seç', onPress: () => console.log('Gallery')},
      ...(currentUser?.avatar
        ? [
            {
              text: 'Fotoğrafı Sil',
              onPress: handleDeleteAvatar,
              style: 'destructive' as const,
            },
          ]
        : []),
      {text: 'İptal', style: 'cancel' as const},
    ]);
  }, [currentUser?.avatar, handleDeleteAvatar]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutMutation().unwrap();
              dispatch(logout());
            } catch (error) {
              // Even if server logout fails, clear local data
              dispatch(logout());
            }
          },
        },
      ],
    );
  }, [logoutMutation, dispatch]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <ArrowLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleAvatarOptions}
          disabled={isUploading || isDeleting}>
          {currentUser?.avatar ? (
            <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>
                {currentUser?.firstName?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
          )}

          <View style={styles.cameraIcon}>
            {isUploading || isDeleting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <CameraIcon size={20} color="#FFFFFF" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.infoSection}>
        {/* Name */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>İsim</Text>
          {isEditingName ? (
            <View style={styles.editContainer}>
              <View style={styles.nameInputContainer}>
                <TextInput
                  style={styles.nameInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Ad"
                  placeholderTextColor="#9CA3AF"
                />
                <TextInput
                  style={styles.nameInput}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Soyad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleCancelName}
                  disabled={isUpdating}>
                  <XMarkIcon size={20} color="#EF4444" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleSaveName}
                  disabled={isUpdating}>
                  {isUpdating ? (
                    <ActivityIndicator size="small" color="#25D366" />
                  ) : (
                    <CheckIcon size={20} color="#25D366" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.infoValue} onPress={handleEditName}>
              <Text style={styles.infoText}>
                {currentUser?.firstName} {currentUser?.lastName}
              </Text>
              <PencilIcon size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Bio */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Hakkında</Text>
          {isEditingBio ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.bioInput}
                value={bioText}
                onChangeText={setBioText}
                placeholder="Hakkınızda birşey yazın..."
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={139}
              />
              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleCancelBio}
                  disabled={isUpdating}>
                  <XMarkIcon size={20} color="#EF4444" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleSaveBio}
                  disabled={isUpdating}>
                  {isUpdating ? (
                    <ActivityIndicator size="small" color="#25D366" />
                  ) : (
                    <CheckIcon size={20} color="#25D366" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.infoValue} onPress={handleEditBio}>
              <Text style={styles.infoText}>
                {currentUser?.bio || 'Hakkınızda birşey yazın...'}
              </Text>
              <PencilIcon size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Phone */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Telefon</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>{currentUser?.phone}</Text>
          </View>
        </View>

        {/* Email */}
        {currentUser?.email && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>E-posta</Text>
            <View style={styles.infoValue}>
              <Text style={styles.infoText}>{currentUser.email}</Text>
            </View>
          </View>
        )}

        {/* Member Since */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Üyelik Tarihi</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>
              {new Date(currentUser?.createdAt || '').toLocaleDateString(
                'tr-TR',
              )}
            </Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoggingOut}>
        {isLoggingOut ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <ArrowLeftOnRectangleIcon size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
