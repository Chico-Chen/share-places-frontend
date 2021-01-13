import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hood';
import PlaceList from '../components/PlaceList';

import './NewPlace.css';


const UserPlaces = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    const [loadedPlacs, setLoadedPlaces] = useState();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/place/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (err) { }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletedPlaceId) => {
        setLoadedPlaces(
            prePlaces => prePlaces.filter(
                place => place.id !== deletedPlaceId
            ));
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading &&
                (<div className="center">
                    <LoadingSpinner />
                </div>)}
            {!isLoading && loadedPlacs && <PlaceList items={loadedPlacs} onDeletePlace={placeDeleteHandler} />}
        </React.Fragment>

    );
};

export default UserPlaces;