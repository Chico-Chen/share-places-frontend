import React from 'react';
import Button from '../../shared/components/FormElement/Button';
import Card from '../../shared/components/UIElement/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button>Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map(place => (
                <PlaceItem 
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    description={place.description}
                    title={place.title}
                    creatorId={place.creator}
                    address={place.address}
                    coordinate={place.location}
                    onDelete={props.onDeletePlace}
                ></PlaceItem>
            ))}
        </ul>
    );
};

export default PlaceList;