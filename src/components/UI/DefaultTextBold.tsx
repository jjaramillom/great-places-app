import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

import { Fonts } from '@app/constants';

type Props = React.PropsWithChildren<TextProps>;

const DefaultTextBold: React.FC<Props> = (props: Props) => {
  const { children, style, ...otherProps } = props;
  return (
    <Text {...otherProps} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.openSansBold,
  },
});

export default DefaultTextBold;
