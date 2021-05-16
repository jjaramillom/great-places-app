// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_KEY } from '@env';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, Image, View, ViewStyle } from 'react-native';

import { PlaceLocation } from './LocationPicker';

interface Props {
  location?: PlaceLocation;
  style?: ViewStyle;
}

const ZOOM_FACTOR = 14;

const MapPreview: React.FC<Props> = ({
  location,
  children,
  style,
}: PropsWithChildren<Props>) => {
  let imageUrl: string | undefined;
  if (location) {
    imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=${ZOOM_FACTOR}&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${GOOGLE_KEY}`;
  }
  console.log(imageUrl);

  return (
    <View style={{ ...styles.mapPreview, ...style }}>
      {location ? <Image style={styles.mapImage} source={{ uri: imageUrl }} /> : children}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
