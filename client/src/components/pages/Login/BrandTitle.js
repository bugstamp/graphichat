import React from 'react';

import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Logo from '../../common/Logo';
import { BrandTitleWrapper } from './styled';

const getLogoParams = (downMd, downSm) => {
  if (downSm) {
    return [35, 'h3'];
  }
  if (downMd) {
    return [35, 'h2'];
  }
  return [60, 'h1'];
};

const BrandTitle = () => {
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));
  const downSm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [logoSize, typographyVariant] = getLogoParams(downMd, downSm);

  return (
    <BrandTitleWrapper>
      <Logo size={logoSize} />
      <Typography
        component="p"
        variant={typographyVariant}
        align="center"
      >
        GraphiChat
      </Typography>
    </BrandTitleWrapper>
  );
};

export default BrandTitle;
