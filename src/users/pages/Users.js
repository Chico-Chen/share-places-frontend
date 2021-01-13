import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';

import UsersList from '../components/UserList';
import { useHttpClient } from '../../shared/hooks/http-hood';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        setLoadedUsers(responseData.users);
      } catch (err) { }
    };
    fetchUsers();
  }, [sendRequest]);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (<div className="center">
        <LoadingSpinner />
      </div>)}
      {!isLoading && loadedUsers && <UsersList item={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
