import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../shared/components/FormElement/Button';

import Input from '../../shared/components/FormElement/Input';
import Card from '../../shared/components/UIElement/Card';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hood';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './PlaceForm.css';


const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();
  
    const [formState, inputHandler, setFormData] = useForm(
      {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        description: {
            value: '',
            isValid: false
          }
      },
      false
    );
  
    useEffect(() => {
      const fetchPlace = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/place/${placeId}`
          );
          setLoadedPlace(responseData.place);
          setFormData(
            {
              title: {
                value: responseData.place.title,
                isValid: true
              },
              description: {
                value: responseData.place.description,
                isValid: true
              },
              address: {
                value: responseData.place.address,
                isValid: true
              }
            },
            true
          );
  
        } catch (err) {}
      };
      fetchPlace();
    }, [sendRequest, placeId, setFormData]);
  
    const placeUpdateSubmitHandler = async event => {
      event.preventDefault();
      try {
        await sendRequest(
          `http://localhost:5000/api/place/${placeId}`,
          'PATCH',
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        history.push('/' + auth.userId + '/places');
      } catch (err) {}
    };
  
    if (isLoading) {
      return (
        <div className="center">
          <LoadingSpinner />
        </div>
      );
    }
  
    if (!loadedPlace && !error) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find place!</h2>
          </Card>
        </div>
      );
    }
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedPlace && (
          <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              initialValue={loadedPlace.title}
              initialValid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min. 5 characters)."
              onInput={inputHandler}
              initialValue={loadedPlace.description}
              initialValid={true}
            />
            <Input
              id="address"
              element="input"
              type="text"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid address."
              onInput={inputHandler}
              initialValue={loadedPlace.address}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE PLACE
            </Button>
          </form>
        )}
      </React.Fragment>
    );
  };
  
  export default UpdatePlace;