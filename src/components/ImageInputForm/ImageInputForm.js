import React from 'react';
import './ImageInputForm.css'

const ImageInputForm = ({onInputChange,onButtonSubmit}) => {
    return(
        <div>
            <p className='f3'>
                {'This will detect a face in your image URL'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                <button
                className='w-30 grow f4 link ph3 pv dib white bg-light-purple'
                onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageInputForm;