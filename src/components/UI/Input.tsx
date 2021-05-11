import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';

import DefaultTextBold from './DefaultTextBold';

export interface Props extends Omit<TextInputProps, 'onChange' | 'value'> {
  label: string;
  onChange: (text: string) => void;
  value?: string;
}

const Input: React.FC<Props> = (props: Props) => {
  const { label, onChange, value: initialValue = '', style, ...rest } = props;

  const [value, setValue] = useState(initialValue);

  const handleChange = (text: string) => {
    setValue(text);
    onChange(text);
  };

  return (
    <View style={[styles.formControl, style]}>
      <DefaultTextBold style={styles.label}>{label}</DefaultTextBold>
      <TextInput
        value={value}
        onChangeText={handleChange}
        style={styles.input}
        autoCapitalize='sentences'
        returnKeyType='next'
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 5,
  },
  input: {
    paddingHorizontal: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControl: {
    marginTop: 10,
    width: '100%',
  },
});

export default Input;
