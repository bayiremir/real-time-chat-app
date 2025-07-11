import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  BellIcon,
  ChevronRightIcon,
  StarIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ChatBubbleLeftIcon,
  UserPlusIcon,
  ListBulletIcon,
  MegaphoneIcon,
  ArrowsUpDownIcon,
  InformationCircleIcon,
} from 'react-native-heroicons/outline';
import {IconType} from '../../../utils/SettingsItem';

export interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
}

// Icon mapping function
export const getIconComponent = (iconType: IconType): React.ReactNode => {
  const iconProps = {size: 24, color: 'black'};

  switch (iconType) {
    case 'bell':
      return <BellIcon {...iconProps} />;
    case 'star':
      return <StarIcon {...iconProps} />;
    case 'computer':
      return <ComputerDesktopIcon {...iconProps} />;
    case 'user-circle':
      return <UserCircleIcon {...iconProps} />;
    case 'shield':
      return <ShieldCheckIcon {...iconProps} />;
    case 'chat':
      return <ChatBubbleLeftIcon {...iconProps} />;
    case 'user-plus':
      return <UserPlusIcon {...iconProps} />;
    case 'list':
      return <ListBulletIcon {...iconProps} />;
    case 'megaphone':
      return <MegaphoneIcon {...iconProps} />;
    case 'arrows-up-down':
      return <ArrowsUpDownIcon {...iconProps} />;
    case 'information-circle':
      return <InformationCircleIcon {...iconProps} />;
    default:
      return <InformationCircleIcon {...iconProps} />;
  }
};

// Settings Item Component
export const SettingsItem: React.FC<SettingsItemProps & {styles: any}> = ({
  icon,
  title,
  onPress,
  rightComponent,
  showArrow = true,
  styles,
}) => {
  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        {rightComponent}
        {showArrow && onPress && <ChevronRightIcon size={16} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
