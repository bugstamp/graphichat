import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchDialogContainer from '../../smart/SearchDialogContainer';

import ListSearch from './AppList/ListSearch';
import List from './AppList/List';
import SearchDialogListItem from './SearchDialogListItem';

import { getSpacing } from '../../../styles';

const ListWrapper = styled.div`
  height: 200px;
  display: flex;
`;

const SubTitle = styled(Typography)`
  && {
    padding-top: ${getSpacing(1)};
  }
`;

const ProgressWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class SearchDialog extends PureComponent {
  state = {
    searchValue: '',
  }

  onChangeSearchValue = (value, refetch) => {
    this.setState(
      () => ({ searchValue: value }),
      () => {
        refetch();
      },
    );
  }

  render() {
    const { searchValue } = this.state;
    const { open, toggle } = this.props;

    return (
      <SearchDialogContainer
        searchUsersProps={{
          variables: { searchValue },
          skip: !searchValue,
        }}
      >
        {({ searchUsers: { loading, data, refetch } }) => {
          return (
            <Dialog open={open} onClose={toggle} scroll="body">
              <DialogTitle>
                Search contact
                <SubTitle variant="subtitle2">
                  Search contact by name or use "@" as a first character for searching by username.
                </SubTitle>
              </DialogTitle>
              <DialogContent>
                <ListSearch
                  value={searchValue}
                  onChange={value => this.onChangeSearchValue(value, refetch)}
                />
                <ListWrapper>
                  <Choose>
                    <When condition={loading}>
                      <ProgressWrapper>
                        <CircularProgress size={20} />
                      </ProgressWrapper>
                    </When>
                    <When condition={!data}>
                      {null}
                    </When>
                    <Otherwise>
                      <List>
                        {map(data.searchUsers, (item) => {
                          const { id } = item;

                          return (<SearchDialogListItem key={id} {...item} />);
                        })}
                      </List>
                    </Otherwise>
                  </Choose>
                </ListWrapper>
              </DialogContent>
              <DialogActions>
                <Button onClick={toggle} color="primary">Close</Button>
              </DialogActions>
              {/* <DialogActions>
                <Button onClick={toggle} color="primary">Cancel</Button>
                <Button color="primary" disabled>Add</Button>
              </DialogActions> */}
            </Dialog>
          );
        }}
      </SearchDialogContainer>
    );
  }
}

export default SearchDialog;
