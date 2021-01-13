import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './NewPlace.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/FormElement/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hood';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElement/ImageUpload';


const NewPlace = () => {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputChangeHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            image: {
                value: null,
                isValid: false
            }
        },
        false
    );

    const history = useHistory();

    const placesSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);
            await sendRequest('http://localhost:5000/api/place',
                'POST',
                formData
            );
            history.push('/');
            //redirect the user to different page
        } catch (err) {

        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}></ErrorModal>
            <form className="place-form">
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    element="input"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputChangeHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)"
                    onInput={inputChangeHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address"
                    onInput={inputChangeHandler}
                />
                <ImageUpload id="image" onInput={inputChangeHandler} errorText="Please add an image" />
                <Button type="submit" disabled={!formState.isValid} onClick={placesSubmitHandler}>SUBMIT</Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;