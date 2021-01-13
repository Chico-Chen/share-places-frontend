import React from 'react';

import UserItem from './UserItem';
import './UserList.css';
import Card from '../../shared/components/UIElement/Card';


const UsersList = props => {
    if (props.item.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.item.map(user => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    username={user.username}
                    placeCount={user.places.length}
                />
            ))}
        </ul>
    );
};

export default UsersList;
