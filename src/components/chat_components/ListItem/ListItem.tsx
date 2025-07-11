import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ListItem as ListItemType} from '../../../interfaces/lists.interface';
import {styles} from '../../../screens/tabs/ChatScreen/styles';

interface ListItemProps {
  item: ListItemType;
  isSelected: boolean;
  onPress: (listId: string) => void;
}

export const ListItem = ({item, isSelected, onPress}: ListItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.listItem, isSelected && styles.selectedListItem]}
      onPress={() => onPress(item.id)}>
      <Text
        style={[
          styles.listItemText,
          isSelected && styles.selectedListItemText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
