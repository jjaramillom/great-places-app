import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  HeaderButton as ReactHeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';

const HeaderButton: React.FC<HeaderButtonProps> = (props: HeaderButtonProps) => (
  <ReactHeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='white' />
);

export default HeaderButton;
