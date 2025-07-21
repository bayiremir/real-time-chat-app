import React from 'react';
import {Text, TouchableOpacity, View, Switch} from 'react-native';
import {ChevronRightIcon, CheckIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';

interface ProfileListItemProps {
  title: string;
  onPress?: () => void;
  showDivider?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  rightText?: string;
  showCheckmark?: boolean;
  color?: string | undefined;
  showIcon?: boolean;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
  title,
  onPress,
  showDivider = false,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  rightText,
  showCheckmark = false,
  color,
  showIcon = true,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Text style={[styles.listItemText, {color: color || 'black'}]}>
          {title}
        </Text>
        {showSwitch ? (
          <Switch
            style={styles.switch}
            value={switchValue}
            onValueChange={onSwitchChange}
          />
        ) : (
          <View style={styles.rightContainer}>
            {rightText && <Text style={styles.rightText}>{rightText}</Text>}
            {showIcon &&
              (showCheckmark ? (
                <CheckIcon size={20} color={'green'} />
              ) : (
                <ChevronRightIcon size={20} color={'gray'} />
              ))}
          </View>
        )}
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );
};

export default ProfileListItem;
