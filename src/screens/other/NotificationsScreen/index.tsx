import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  useListNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useDeleteAllNotificationsMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} from '../../../redux/services/mobileApi';
import {Notification} from '../../../interfaces/api.interface';
// Icons
import {
  ArrowLeftIcon,
  BellIcon,
  TrashIcon,
  CheckIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {styles} from './styles';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: notificationsData,
    isLoading,
    refetch,
  } = useListNotificationsQuery({page: 1, limit: 50});

  const [markAllAsRead, {isLoading: isMarkingAll}] =
    useMarkAllNotificationsAsReadMutation();
  const [deleteAll, {isLoading: isDeletingAll}] =
    useDeleteAllNotificationsMutation();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationsData?.data || [];

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await markAllAsRead().unwrap();
      refetch();
    } catch (error) {
      Alert.alert(
        'Hata',
        'Bildirimler okundu olarak işaretlenirken hata oluştu',
      );
    }
  }, [markAllAsRead, refetch]);

  const handleDeleteAll = useCallback(() => {
    Alert.alert(
      'Tüm Bildirimleri Sil',
      'Tüm bildirimleri silmek istediğinizden emin misiniz?',
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAll().unwrap();
              refetch();
            } catch (error) {
              Alert.alert('Hata', 'Bildirimler silinirken hata oluştu');
            }
          },
        },
      ],
    );
  }, [deleteAll, refetch]);

  const handleNotificationPress = useCallback(
    async (notification: Notification) => {
      if (!notification.isRead) {
        try {
          await markAsRead(notification._id);
          refetch();
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
        }
      }

      // Navigate based on notification type
      if (notification.type === 'message' && notification.data?.chatId) {
        // Navigate to chat detail
        console.log('Navigate to chat:', notification.data.chatId);
      }
    },
    [markAsRead, refetch],
  );

  const handleNotificationOptions = useCallback(
    (notification: Notification) => {
      Alert.alert('Bildirim Seçenekleri', 'Ne yapmak istiyorsunuz?', [
        {
          text: notification.isRead
            ? 'Okunmadı olarak işaretle'
            : 'Okundu olarak işaretle',
          onPress: async () => {
            try {
              await markAsRead(notification._id);
              refetch();
            } catch (error) {
              Alert.alert('Hata', 'İşlem sırasında hata oluştu');
            }
          },
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteNotification(notification._id);
              refetch();
            } catch (error) {
              Alert.alert('Hata', 'Bildirim silinirken hata oluştu');
            }
          },
        },
        {text: 'İptal', style: 'cancel'},
      ]);
    },
    [markAsRead, deleteNotification, refetch],
  );

  const renderNotificationItem = useCallback(
    ({item}: {item: Notification}) => {
      const getNotificationIcon = () => {
        switch (item.type) {
          case 'message':
            return '💬';
          case 'group_invite':
            return '👥';
          case 'contact_request':
            return '👤';
          case 'system':
            return '⚙️';
          default:
            return '📢';
        }
      };

      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Şimdi';
        if (diffMins < 60) return `${diffMins}dk`;
        if (diffHours < 24) return `${diffHours}s`;
        if (diffDays < 7) return `${diffDays}g`;
        return date.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
        });
      };

      return (
        <TouchableOpacity
          style={[
            styles.notificationItem,
            !item.isRead && styles.unreadNotification,
          ]}
          onPress={() => handleNotificationPress(item)}
          activeOpacity={0.7}>
          <View style={styles.notificationIcon}>
            <Text style={styles.iconText}>{getNotificationIcon()}</Text>
          </View>

          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationTime}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>

          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => handleNotificationOptions(item)}>
            <EllipsisVerticalIcon size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    },
    [handleNotificationPress, handleNotificationOptions],
  );

  const renderEmptyState = useCallback(() => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyState}>
        <BellIcon size={64} color="#9CA3AF" />
        <Text style={styles.emptyStateTitle}>Bildirim yok</Text>
        <Text style={styles.emptyStateSubtitle}>
          Henüz hiç bildiriminiz bulunmuyor
        </Text>
      </View>
    );
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleMarkAllAsRead}
            disabled={isMarkingAll || notifications.length === 0}>
            {isMarkingAll ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <CheckIcon size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDeleteAll}
            disabled={isDeletingAll || notifications.length === 0}>
            {isDeletingAll ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <TrashIcon size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25D366" />
          <Text style={styles.loadingText}>Bildirimler yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item._id}
          style={styles.notificationsList}
          contentContainerStyle={[
            styles.notificationsListContent,
            notifications.length === 0 && styles.emptyContainer,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#25D366']}
            />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

export default NotificationsScreen;
