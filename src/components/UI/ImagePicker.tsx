import * as ExpoImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';

import DefaultText from './DefaultText';
import { Colors } from '@app/constants';

const hasPermissions = async (): Promise<boolean> => {
  const result = await ExpoImagePicker.requestCameraPermissionsAsync();
  if (!result.granted) {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant camera permissions to use this app',
      [{ text: 'ok' }]
    );
  }
  return result.granted;
};

interface Props {
  onImageTaken: (imageUri: string) => void;
}

const ImagePicker: React.FC<Props> = ({ onImageTaken }: Props) => {
  const [pickedImageUri, setPickedImageUri] = useState<string>('');
  const handleSelectImage = async () => {
    if (await !hasPermissions()) {
      return;
    }

    const image = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.cancelled) {
      setPickedImageUri(image.uri);
      onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImageUri ? (
          <Image style={styles.image} source={{ uri: pickedImageUri }} />
        ) : (
          <DefaultText>No Image picked yet.</DefaultText>
        )}
      </View>
      <Button title='Take picture' color={Colors.primary} onPress={handleSelectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePicker;
