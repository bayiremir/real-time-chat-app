import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import {styles} from './styles';
import {
  StarIcon,
  ArrowUpRightIcon,
  ClipboardIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  BookmarkIcon,
} from 'react-native-heroicons/outline';

interface MessageContextMenuProps {
  visible: boolean;
  onClose: () => void;
  onStar: () => void;
  onReply: () => void;
  onForward: () => void;
  onCopy: () => void;
  onPin: () => void;
  onReport: () => void;
  onDelete: () => void;
  isStarred: boolean;
  selectedMessage: any;
  messageRef: any;
}

const MessageContextMenu: React.FC<MessageContextMenuProps> = ({
  visible,
  onClose,
  onStar,
  onReply,
  onForward,
  onCopy,
  onPin,
  onReport,
  onDelete,
  isStarred,
  selectedMessage,
  messageRef,
}) => {
  const menuItems = [
    {
      title: isStarred ? 'Yıldızdan Kaldır' : 'Yıldızla',
      icon: isStarred ? (
        <StarIcon size={22} color="#FFD700" stroke="#FFD700" strokeWidth={2} />
      ) : (
        <StarIcon size={22} color="#000000" strokeWidth={2} />
      ),
      onPress: onStar,
    },
    {
      title: 'Yanıtla',
      icon: <ArrowUturnLeftIcon size={22} color="#000000" strokeWidth={2} />,
      onPress: onReply,
    },
    {
      title: 'İlet',
      icon: <ArrowUpRightIcon size={22} color="#000000" strokeWidth={2} />,
      onPress: onForward,
    },
    {
      title: 'Kopyala',
      icon: <ClipboardIcon size={22} color="#000000" strokeWidth={2} />,
      onPress: onCopy,
    },
    {
      title: 'Sabitle',
      icon: <BookmarkIcon size={22} color="#000000" strokeWidth={2} />,
      onPress: onPin,
    },
    {
      title: 'Şikayet Et',
      icon: (
        <ExclamationTriangleIcon size={22} color="#000000" strokeWidth={2} />
      ),
      onPress: onReport,
    },
    {
      title: 'Sil',
      icon: <TrashIcon size={22} color="#ff3b30" strokeWidth={2} />,
      onPress: onDelete,
      isDelete: true,
    },
  ];

  if (!selectedMessage) return null;

  return (
    <Popover
      isVisible={visible}
      onRequestClose={onClose}
      from={messageRef}
      placement={PopoverPlacement.AUTO}
      popoverStyle={styles.menuContainer}
      backgroundStyle={styles.transparentOverlay}
      arrowSize={{width: 0, height: 0}}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.lastMenuItem,
            ]}
            onPress={() => {
              item.onPress();
              onClose();
            }}
            activeOpacity={0.6}>
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={[styles.menuText, item.isDelete && styles.deleteText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Popover>
  );
};

export default MessageContextMenu;
