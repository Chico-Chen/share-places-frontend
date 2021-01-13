import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    //store the value
    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        //whenever the file reader loads a new file or is parsing a new file, onload() execute
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);

    //preview the file, foward the file to the component
    const pickedHandler = (event) => {
        let filePicked;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            filePicked = event.target.files[0];
            setFile(filePicked);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, filePicked, fileIsValid);
    }

    //pickImageHandler triggers the input below, to get access on input element, use useRef
    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick a image.</p>}
                </div>
                <Button type="Button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;