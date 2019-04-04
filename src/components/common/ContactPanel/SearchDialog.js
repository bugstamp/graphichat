import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

// import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import AppListSearch from './AppList/ListSearch';
import AppList from './AppList/List';
import SearchDialogListItem from './SearchDialogListItem';

// import {} from '../../../styles';

const DialogContent = styled.div`
  width: 100%;
  min-width: 400px;
  min-height: 500px;
  display: flex;
  flex-flow: column;
  padding: 0 24px;
`;

const list = [{
  id: 123123,
  avatar: '',
  firstName: 'Kiril',
  lastName: 'Grischenko',
  fullName: 'Kiril Grischenko',
  login: 'onemorekiril',
}];

const SearchDialog = ({ open, toggle }) => (
  <Dialog maxWidth="md" open={open} onClose={toggle}>
    <DialogTitle>Search contact</DialogTitle>
    <DialogContent>
      <AppListSearch />
      <AppList>
        {map(list, (item) => {
          const { id } = item;

          return (<SearchDialogListItem key={id} {...item} />)
        })}
      </AppList>
    </DialogContent>
    <DialogActions>
      <Button onClick={toggle} color="primary">Cancel</Button>
      <Button color="primary" disabled>Add</Button>
    </DialogActions>
  </Dialog>
);

export default SearchDialog;
