import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import { getStyledProps } from '../../../styles';

const Scrollbar = styled.div`
  ${position('absolute', 0, 0, 0, null)};
  width: 3px;
  display: ${({ presence }) => (presence ? 'block' : 'none')};
  background-color: ${getStyledProps('theme.palette.grey.300')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: .25s ease;
  z-index: 20;
  cursor: pointer;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const lgDown = breakpoints.down('md');

    return `
      ${lgDown} {
        display: none !important;
      }
    `;
  }}
`;

const ScrollbarThumb = styled.button`
  width: 100%;
  position: relative;
  padding: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  border: none;
  will-change: transform;
  cursor: pointer;
`;

const ListScrollbar = forwardRef(({
  show,
  presence,
  onMouseDown,
}, ref) => {
  return (
    <Scrollbar show={show} presence={presence}>
      <ScrollbarThumb
        ref={ref}
        type="button"
        onDragStart={() => false}
        onMouseDown={onMouseDown}
      />
    </Scrollbar>
  );
});

ListScrollbar.propTypes = {
  show: PropTypes.bool.isRequired,
  presence: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default memo(ListScrollbar);
