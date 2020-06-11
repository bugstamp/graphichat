import { useMemo } from 'react';

import { getAvatar } from '../../helpers/user';

const useAvatar = (user, size) => {
  const avatar = useMemo(() => getAvatar(user, size), [user, size]);

  return avatar;
};

export default useAvatar;
