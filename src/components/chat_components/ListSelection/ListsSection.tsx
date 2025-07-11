import React from 'react';
import {FlatList} from 'react-native';
import {ListItem as ListItemType} from '../../../interfaces/lists.interface';
import {ListItem} from '../ListItem/ListItem';
import {styles} from '../../../screens/tabs/ChatScreen/styles';

interface ListsSectionProps {
  lists: ListItemType[];
  onListSelect: (listId: string) => void;
  isListSelected: (listId: string) => boolean;
}

export const ListsSection = ({
  lists,
  onListSelect,
  isListSelected,
}: ListsSectionProps) => {
  const renderListItem = ({item}: {item: ListItemType}) => (
    <ListItem
      item={item}
      isSelected={isListSelected(item.id)}
      onPress={onListSelect}
    />
  );

  return (
    <FlatList
      data={lists}
      horizontal
      style={styles.listsContainer}
      renderItem={renderListItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listsContentContainer}
    />
  );
};
