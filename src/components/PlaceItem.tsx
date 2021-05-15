import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { TouchableComponent } from '@app/components/UI';
import Colors from '@app/constants/Colors';
import Place from '@app/models/Place';

interface Props {
  place: Place;
  onSelect: () => void;
}

const PlaceItem: React.FC<Props> = ({ place, onSelect }: Props) => {
  return (
    <TouchableComponent onPress={onSelect}>
      <View style={styles.placeItem}>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: '#666',
    fontSize: 16,
  },
});

export default PlaceItem;
