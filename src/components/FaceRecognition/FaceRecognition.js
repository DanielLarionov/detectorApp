import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({imageURL,box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2 shadow-5 ba b--dashed'>
                <img id='inputImage' alt='face pic' src={imageURL} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol,bottom: box.bottomRow,left:box.leftCol }}></div>
            </div>
        </div>
    );
}
export default FaceRecognition;