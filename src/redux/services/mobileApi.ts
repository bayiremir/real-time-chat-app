import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {BASEURL} from '@env';
import {storage} from '../../utils/Storage';
import {
  RegisterRequest,
  LoginRequest,
  AuthSuccessResponse,
  PhoneRegistrationRequest,
  PhoneLoginRequest,
  PhoneVerificationRequest,
  PhoneResendRequest,
  PhoneRegistrationResponse,
  PhoneLoginResponse,
  PhoneVerificationResponse,
  ProfileUpdateRequest,
  ChangePasswordRequest,
  DeleteAccountRequest,
  StatusUpdateRequest,
  PasswordResetRequest,
  PasswordResetResponse,
  ResetPasswordRequest,
  EmailVerificationRequest,
  ResendEmailResponse,
  SearchUsersParams,
  ContactsListParams,
  AddContactRequest,
  BlockUserRequest,
  AvailabilityCheckParams,
  AvailabilityResponse,
  BaseResponse,
  DataResponse,
  PaginatedResponse,
  RefreshTokenResponse,
  AvatarUploadResponse,
  ApiDocsResponse,
  User,
  UserActivity,
  Chat,
  Message,
  Notification,
  CreateChatRequest,
  UpdateChatInfoRequest,
  AddParticipantsRequest,
  UpdateChatSettingsRequest,
  SendMessageRequest,
  EditMessageRequest,
  AddReactionRequest,
  ForwardMessageRequest,
  SearchMessagesParams,
  ListNotificationsParams,
  NotificationsByTypeParams,
  CreateNotificationRequest,
  TestNotificationRequest,
  NotificationSettings,
  PaginationParams,
} from '../../interfaces/api.interface';

const baseQuery = fetchBaseQuery({
  baseUrl: BASEURL,
  prepareHeaders: async headers => {
    const credentials = storage.getString('token');
    if (credentials) {
      headers.set('Authorization', `Bearer ${credentials}`);
    }
    return headers;
  },
});

const baseQueryWithCheck = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  // Unauthorized kontrolü ve hata işlemleri yapılabilir
  if (result.error?.status === 401) {
    console.error('Unauthorized, logging out...');
    // Çıkış işlemi veya toast mesaj
  }

  return result;
};

export const mobileApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithCheck,
  tagTypes: ['User', 'Chat', 'Message', 'Notification', 'Contact'],
  endpoints: builder => ({
    // Authentication Endpoints
    register: builder.mutation<AuthSuccessResponse, RegisterRequest>({
      query: data => ({
        url: '/api/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<AuthSuccessResponse, LoginRequest>({
      query: data => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    phoneRegister: builder.mutation<
      PhoneRegistrationResponse,
      PhoneRegistrationRequest
    >({
      query: data => ({
        url: '/api/auth/phone/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    phoneLogin: builder.mutation<PhoneLoginResponse, PhoneLoginRequest>({
      query: data => ({
        url: '/api/auth/phone/login',
        method: 'POST',
        body: data,
      }),
    }),

    phoneVerify: builder.mutation<
      PhoneVerificationResponse,
      PhoneVerificationRequest
    >({
      query: data => ({
        url: '/api/auth/phone/verify',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    phoneResend: builder.mutation<PhoneLoginResponse, PhoneResendRequest>({
      query: data => ({
        url: '/api/auth/phone/resend',
        method: 'POST',
        body: data,
      }),
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: '/api/auth/refresh',
        method: 'POST',
      }),
    }),

    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    requestPasswordReset: builder.mutation<
      PasswordResetResponse,
      PasswordResetRequest
    >({
      query: data => ({
        url: '/api/auth/request-password-reset',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<BaseResponse, ResetPasswordRequest>({
      query: data => ({
        url: '/api/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    changePassword: builder.mutation<BaseResponse, ChangePasswordRequest>({
      query: data => ({
        url: '/api/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmail: builder.mutation<BaseResponse, EmailVerificationRequest>({
      query: data => ({
        url: '/api/auth/verify-email',
        method: 'POST',
        body: data,
      }),
    }),

    resendEmailVerification: builder.mutation<ResendEmailResponse, void>({
      query: () => ({
        url: '/api/auth/resend-email-verification',
        method: 'POST',
      }),
    }),

    checkAvailability: builder.query<
      AvailabilityResponse,
      AvailabilityCheckParams
    >({
      query: params => ({
        url: '/api/auth/check-availability',
        params,
      }),
    }),

    deleteAccount: builder.mutation<BaseResponse, DeleteAccountRequest>({
      query: data => ({
        url: '/api/auth/delete-account',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // User Profile Endpoints
    getProfile: builder.query<DataResponse<User>, void>({
      query: () => '/api/auth/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<DataResponse<User>, ProfileUpdateRequest>({
      query: data => ({
        url: '/api/auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Users Endpoints
    searchUsers: builder.query<PaginatedResponse<User>, SearchUsersParams>({
      query: params => ({
        url: '/api/users/search',
        params,
      }),
    }),

    getOnlineUsers: builder.query<DataResponse<User[]>, void>({
      query: () => '/api/users/online',
      providesTags: ['User'],
    }),

    getUserById: builder.query<DataResponse<User>, string>({
      query: userId => `/api/users/${userId}`,
      providesTags: ['User'],
    }),

    getUserActivity: builder.query<DataResponse<UserActivity>, string>({
      query: userId => `/api/users/${userId}/activity`,
      providesTags: ['User'],
    }),

    getContacts: builder.query<PaginatedResponse<User>, ContactsListParams>({
      query: params => ({
        url: '/api/users/contacts/list',
        params,
      }),
      providesTags: ['Contact'],
    }),

    addContact: builder.mutation<BaseResponse, AddContactRequest>({
      query: data => ({
        url: '/api/users/contacts/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),

    removeContact: builder.mutation<BaseResponse, string>({
      query: userId => ({
        url: `/api/users/contacts/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    blockUser: builder.mutation<BaseResponse, BlockUserRequest>({
      query: data => ({
        url: '/api/users/block',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    unblockUser: builder.mutation<BaseResponse, string>({
      query: userId => ({
        url: `/api/users/block/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    getBlockedUsers: builder.query<DataResponse<User[]>, void>({
      query: () => '/api/users/blocked/list',
      providesTags: ['User'],
    }),

    uploadAvatar: builder.mutation<AvatarUploadResponse, FormData>({
      query: formData => ({
        url: '/api/users/avatar/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    deleteAvatar: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/api/users/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    updateStatus: builder.mutation<BaseResponse, StatusUpdateRequest>({
      query: data => ({
        url: '/api/users/status',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Chat Endpoints
    createChat: builder.mutation<DataResponse<Chat>, CreateChatRequest>({
      query: data => ({
        url: '/api/chats/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),

    listChats: builder.query<PaginatedResponse<Chat>, PaginationParams>({
      query: params => ({
        url: '/api/chats/list',
        params,
      }),
      providesTags: ['Chat'],
    }),

    getChatById: builder.query<DataResponse<Chat>, string>({
      query: chatId => `/api/chats/${chatId}`,
      providesTags: ['Chat'],
    }),

    deleteChatById: builder.mutation<BaseResponse, string>({
      query: chatId => ({
        url: `/api/chats/${chatId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chat', 'Message'],
    }),

    updateChatInfo: builder.mutation<
      DataResponse<Chat>,
      {chatId: string; data: UpdateChatInfoRequest}
    >({
      query: ({chatId, data}) => ({
        url: `/api/chats/${chatId}/info`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),

    uploadChatAvatar: builder.mutation<
      DataResponse<{avatarUrl: string}>,
      {chatId: string; formData: FormData}
    >({
      query: ({chatId, formData}) => ({
        url: `/api/chats/${chatId}/avatar`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Chat'],
    }),

    addParticipants: builder.mutation<
      DataResponse<Chat>,
      {chatId: string; data: AddParticipantsRequest}
    >({
      query: ({chatId, data}) => ({
        url: `/api/chats/${chatId}/participants/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),

    removeParticipant: builder.mutation<
      DataResponse<Chat>,
      {chatId: string; userId: string}
    >({
      query: ({chatId, userId}) => ({
        url: `/api/chats/${chatId}/participants/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chat'],
    }),

    leaveChat: builder.mutation<BaseResponse, string>({
      query: chatId => ({
        url: `/api/chats/${chatId}/leave`,
        method: 'POST',
      }),
      invalidatesTags: ['Chat'],
    }),

    promoteToAdmin: builder.mutation<
      DataResponse<Chat>,
      {chatId: string; userId: string}
    >({
      query: ({chatId, userId}) => ({
        url: `/api/chats/${chatId}/admin/${userId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Chat'],
    }),

    removeAdminPrivileges: builder.mutation<
      DataResponse<Chat>,
      {chatId: string; userId: string}
    >({
      query: ({chatId, userId}) => ({
        url: `/api/chats/${chatId}/admin/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chat'],
    }),

    updateChatSettings: builder.mutation<
      DataResponse<Chat>,
      {chatId: string; data: UpdateChatSettingsRequest}
    >({
      query: ({chatId, data}) => ({
        url: `/api/chats/${chatId}/settings`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),

    // Message Endpoints
    sendMessage: builder.mutation<DataResponse<Message>, SendMessageRequest>({
      query: data => ({
        url: '/api/messages/send',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message', 'Chat'],
    }),

    sendMessageWithFile: builder.mutation<DataResponse<Message>, FormData>({
      query: formData => ({
        url: '/api/messages/send',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Message', 'Chat'],
    }),

    getChatMessages: builder.query<
      PaginatedResponse<Message>,
      {chatId: string; params?: PaginationParams}
    >({
      query: ({chatId, params}) => ({
        url: `/api/messages/chat/${chatId}`,
        params,
      }),
      providesTags: ['Message'],
    }),

    getUnreadMessages: builder.query<
      DataResponse<{
        totalUnreadCount: number;
        chats: Array<{
          chatId: string;
          chatName: string;
          unreadCount: number;
          lastMessage: Message;
        }>;
      }>,
      void
    >({
      query: () => '/api/messages/unread',
      providesTags: ['Message'],
    }),

    getMessageById: builder.query<DataResponse<Message>, string>({
      query: messageId => `/api/messages/${messageId}`,
      providesTags: ['Message'],
    }),

    editMessage: builder.mutation<
      DataResponse<Message>,
      {messageId: string; data: EditMessageRequest}
    >({
      query: ({messageId, data}) => ({
        url: `/api/messages/${messageId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),

    deleteMessage: builder.mutation<BaseResponse, string>({
      query: messageId => ({
        url: `/api/messages/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message', 'Chat'],
    }),

    addReaction: builder.mutation<
      DataResponse<Message>,
      {messageId: string; data: AddReactionRequest}
    >({
      query: ({messageId, data}) => ({
        url: `/api/messages/${messageId}/reactions`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),

    removeReaction: builder.mutation<DataResponse<Message>, string>({
      query: messageId => ({
        url: `/api/messages/${messageId}/reactions`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),

    markMessageAsRead: builder.mutation<BaseResponse, string>({
      query: messageId => ({
        url: `/api/messages/${messageId}/read`,
        method: 'POST',
      }),
      invalidatesTags: ['Message'],
    }),

    markAllChatMessagesAsRead: builder.mutation<BaseResponse, string>({
      query: chatId => ({
        url: `/api/messages/chat/${chatId}/read-all`,
        method: 'POST',
      }),
      invalidatesTags: ['Message', 'Chat'],
    }),

    forwardMessage: builder.mutation<
      BaseResponse,
      {messageId: string; data: ForwardMessageRequest}
    >({
      query: ({messageId, data}) => ({
        url: `/api/messages/${messageId}/forward`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),

    searchChatMessages: builder.query<
      PaginatedResponse<Message>,
      {chatId: string; params: SearchMessagesParams}
    >({
      query: ({chatId, params}) => ({
        url: `/api/messages/chat/${chatId}/search`,
        params,
      }),
    }),

    // Notification Endpoints
    listNotifications: builder.query<
      PaginatedResponse<Notification>,
      ListNotificationsParams
    >({
      query: params => ({
        url: '/api/notifications/list',
        params,
      }),
      providesTags: ['Notification'],
    }),

    getUnreadNotificationCount: builder.query<
      DataResponse<{unreadCount: number}>,
      void
    >({
      query: () => '/api/notifications/unread/count',
      providesTags: ['Notification'],
    }),

    getNotificationsByType: builder.query<
      PaginatedResponse<Notification>,
      {
        type: 'message' | 'group_invite' | 'contact_request' | 'system';
        params?: NotificationsByTypeParams;
      }
    >({
      query: ({type, params}) => ({
        url: `/api/notifications/type/${type}`,
        params,
      }),
      providesTags: ['Notification'],
    }),

    getNotificationById: builder.query<DataResponse<Notification>, string>({
      query: notificationId => `/api/notifications/${notificationId}`,
      providesTags: ['Notification'],
    }),

    deleteNotification: builder.mutation<BaseResponse, string>({
      query: notificationId => ({
        url: `/api/notifications/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),

    markNotificationAsRead: builder.mutation<BaseResponse, string>({
      query: notificationId => ({
        url: `/api/notifications/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),

    markAllNotificationsAsRead: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/api/notifications/read-all',
        method: 'POST',
      }),
      invalidatesTags: ['Notification'],
    }),

    deleteAllNotifications: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/api/notifications/all',
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),

    getNotificationSettings: builder.query<
      DataResponse<NotificationSettings>,
      void
    >({
      query: () => '/api/notifications/settings/preferences',
      providesTags: ['Notification'],
    }),

    updateNotificationSettings: builder.mutation<
      DataResponse<NotificationSettings>,
      Partial<NotificationSettings>
    >({
      query: data => ({
        url: '/api/notifications/settings/preferences',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Notification'],
    }),

    createNotification: builder.mutation<
      BaseResponse,
      CreateNotificationRequest
    >({
      query: data => ({
        url: '/api/notifications/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notification'],
    }),

    sendTestNotification: builder.mutation<
      BaseResponse,
      TestNotificationRequest
    >({
      query: data => ({
        url: '/api/notifications/test',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notification'],
    }),

    // Documentation
    getApiDocs: builder.query<ApiDocsResponse, void>({
      query: () => '/api/docs-json',
    }),
  }),
});

export const {
  // Authentication
  useRegisterMutation,
  useLoginMutation,
  usePhoneRegisterMutation,
  usePhoneLoginMutation,
  usePhoneVerifyMutation,
  usePhoneResendMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useResendEmailVerificationMutation,
  useCheckAvailabilityQuery,
  useDeleteAccountMutation,

  // User Profile
  useGetProfileQuery,
  useUpdateProfileMutation,

  // Users
  useSearchUsersQuery,
  useGetOnlineUsersQuery,
  useGetUserByIdQuery,
  useGetUserActivityQuery,
  useGetContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetBlockedUsersQuery,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useUpdateStatusMutation,

  // Chats
  useCreateChatMutation,
  useListChatsQuery,
  useGetChatByIdQuery,
  useDeleteChatByIdMutation,
  useUpdateChatInfoMutation,
  useUploadChatAvatarMutation,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  useLeaveChatMutation,
  usePromoteToAdminMutation,
  useRemoveAdminPrivilegesMutation,
  useUpdateChatSettingsMutation,

  // Messages
  useSendMessageMutation,
  useSendMessageWithFileMutation,
  useGetChatMessagesQuery,
  useGetUnreadMessagesQuery,
  useGetMessageByIdQuery,
  useEditMessageMutation,
  useDeleteMessageMutation,
  useAddReactionMutation,
  useRemoveReactionMutation,
  useMarkMessageAsReadMutation,
  useMarkAllChatMessagesAsReadMutation,
  useForwardMessageMutation,
  useSearchChatMessagesQuery,

  // Notifications
  useListNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useGetNotificationsByTypeQuery,
  useGetNotificationByIdQuery,
  useDeleteNotificationMutation,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteAllNotificationsMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useCreateNotificationMutation,
  useSendTestNotificationMutation,

  // Documentation
  useGetApiDocsQuery,
} = mobileApi;
