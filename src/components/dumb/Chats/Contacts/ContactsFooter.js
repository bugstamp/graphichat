import React, { Component } from 'react';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';

import { getSpacing } from '../../../../styles';

const ListPanelFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${getSpacing(1)} 0;
`;

class ContactPanelFooter extends Component {
  render() {
    const { toggleSearchDialog } = this.props;

    return (
      <ListPanelFooter>
        <Fab color="primary" size="medium" onClick={toggleSearchDialog}>
          <AddIcon />
        </Fab>
      </ListPanelFooter>
    );
  }
}

export default ContactPanelFooter;
