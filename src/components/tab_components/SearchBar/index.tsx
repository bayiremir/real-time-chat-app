import {TextInput, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Ara"
          placeholderTextColor="gray"
        />
      </View>
    </View>
  );
};

export default SearchBar;
