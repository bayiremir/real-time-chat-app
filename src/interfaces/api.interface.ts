// Base response interfaces
export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface DataResponse<T> extends BaseResponse {
  data: T;
}

export interface ErrorResponse extends BaseResponse {
  error?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  pagination: PaginationInfo;
}

// User interfaces
export interface User {
  _id: string;
  username?: string;
  email?: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserActivity {
  isOnline: boolean;
  lastSeen: string;
  status?: string;
}

// Authentication interfaces
export interface AuthSuccessResponse extends BaseResponse {
  data: {
    user: User;
    token: string;
  };
}

// Legacy auth (email/password)
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Phone authentication
export interface PhoneRegistrationRequest {
  phone: string;
  firstName: string;
  lastName: string;
  username?: string;
  email?: string;
}

export interface PhoneLoginRequest {
  phone: string;
}

export interface PhoneVerificationRequest {
  phone: string;
  code: string;
}

export interface PhoneResendRequest {
  phone: string;
}

export interface PhoneRegistrationResponse extends BaseResponse {
  data: {
    user: User;
    message: string;
    verificationSent: boolean;
  };
}

export interface PhoneLoginResponse extends BaseResponse {
  data: {
    phone: string;
    message: string;
    expiresIn: number;
  };
}

export interface PhoneVerificationResponse extends BaseResponse {
  data: {
    user: User;
    token: string;
    message: string;
  };
}

// Profile interfaces
export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface StatusUpdateRequest {
  status?: string;
  isOnline?: boolean;
}

// Password management
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse extends BaseResponse {
  data: {
    resetToken?: string; // Only visible in development
  };
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface ResendEmailResponse extends BaseResponse {
  data: {
    verificationToken?: string; // Only visible in development
  };
}

// Users and contacts
export interface SearchUsersParams {
  q: string;
  page?: number;
  limit?: number;
}

export interface ContactsListParams {
  page?: number;
  limit?: number;
}

export interface AddContactRequest {
  userId: string;
}

export interface BlockUserRequest {
  userId: string;
}

export interface AvailabilityCheckParams {
  username?: string;
  email?: string;
}

export interface AvailabilityResponse extends BaseResponse {
  data: {
    available: boolean;
  };
}

// Chat interfaces
export interface ChatParticipant {
  user: {
    _id: string;
    username?: string;
    firstName: string;
    lastName: string;
    avatar: string;
    isOnline: boolean;
    lastSeen: string;
    fullName: string;
    id: string;
  } | null;
  role: string;
  notifications: boolean;
  _id: string;
  joinedAt: string;
}

export interface ChatSettings {
  disappearingMessages: {
    enabled: boolean;
    duration: number;
  };
  onlyAdminsCanSend: boolean;
  onlyAdminsCanEditInfo: boolean;
}

export interface Chat {
  _id: string;
  type: string;
  participants: ChatParticipant[];
  creator: string;
  avatar: string;
  isActive: boolean;
  isArchived: boolean;
  lastActivity: string;
  settings: ChatSettings;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Chat request interfaces
export interface CreateChatRequest {
  type: 'private' | 'group';
  name?: string;
  description?: string;
  participants: string[];
}

export interface UpdateChatInfoRequest {
  name?: string;
  description?: string;
}

export interface AddParticipantsRequest {
  participants: string[];
}

export interface UpdateChatSettingsRequest {
  onlyAdminsCanSend?: boolean;
  onlyAdminsCanEditInfo?: boolean;
  onlyAdminsCanAddMembers?: boolean;
  muteNotifications?: boolean;
}

// Message interfaces
export interface MessageAttachment {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
}

export interface MessageReaction {
  user: string;
  emoji: string;
  createdAt: string;
}

export interface MessageReadBy {
  user: string;
  readAt: string;
}

export interface MessageDeliveredTo {
  user: string;
  deliveredAt: string;
}

export interface Message {
  _id: string;
  sender: User;
  chat: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  attachment?: MessageAttachment;
  // Legacy fields for backward compatibility
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  reactions: MessageReaction[];
  readBy: MessageReadBy[];
  deliveredTo: MessageDeliveredTo[];
  replyTo?: string;
  forwardedFrom?: string;
  isForwarded: boolean;
  isEdited: boolean;
  editedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Message request interfaces
export interface SendMessageRequest {
  chatId: string;
  content: string;
  type?: 'text' | 'image' | 'video' | 'audio' | 'document';
  replyTo?: string;
}

export interface EditMessageRequest {
  content: string;
}

export interface AddReactionRequest {
  emoji: string;
}

export interface ForwardMessageRequest {
  chatIds: string[];
  additionalMessage?: string;
}

export interface SearchMessagesParams {
  q: string;
  page?: number;
  limit?: number;
  type?: 'text' | 'image' | 'video' | 'audio' | 'document';
  dateFrom?: string;
  dateTo?: string;
}

// Notification interfaces
export interface NotificationData {
  chatId?: string;
  messageId?: string;
  groupId?: string;
  requestId?: string;
  actionType?: string;
  metadata?: any;
}

export interface Notification {
  _id: string;
  recipient: string;
  sender?: string;
  type: 'message' | 'group_invite' | 'contact_request' | 'system';
  title: string;
  message: string;
  data?: NotificationData;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  isRead: boolean;
  readAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Notification request interfaces
export interface ListNotificationsParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}

export interface NotificationsByTypeParams {
  page?: number;
  limit?: number;
}

export interface CreateNotificationRequest {
  type: 'message' | 'group_invite' | 'contact_request' | 'system';
  title: string;
  message: string;
  recipients: string[];
  data?: any;
}

export interface TestNotificationRequest {
  title?: string;
  message?: string;
}

export interface NotificationSettings {
  messageNotifications: boolean;
  groupInviteNotifications: boolean;
  contactRequestNotifications: boolean;
  systemNotifications: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

// Utility interfaces
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface RefreshTokenResponse extends BaseResponse {
  data: {
    token: string;
  };
}

export interface AvatarUploadResponse extends BaseResponse {
  data: {
    avatarUrl: string;
  };
}

export interface ApiDocsResponse {
  success: boolean;
  message: string;
  version: string;
  timestamp: string;
  baseUrl: string;
  endpoints: any;
  websocket: any;
  staticFiles: any;
}
