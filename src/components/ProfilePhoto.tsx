import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { StyleValue } from '../types/styles';

const ProfileImage = styled('img')({
  borderRadius: '50%',
  height: '100%',
  width: '100%',
});

interface Props {
  customStyles?: React.CSSProperties;
  imageSrc: string;
  sideLength?: StyleValue;
}

const ProfilePhoto = ({ customStyles, imageSrc, sideLength = 100 }: Props) => (
  <l.Space
    height={sideLength}
    minHeight={sideLength}
    minWidth={sideLength}
    style={customStyles}
    width={sideLength}>
    <ProfileImage src={imageSrc} />
  </l.Space>
);

export default ProfilePhoto;
