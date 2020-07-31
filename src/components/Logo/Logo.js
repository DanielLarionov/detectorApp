import React from 'react';
import './Logo.css'
import manLogo from './man.png'
import foodLogo from './hamburger.png'
import Tilt from 'react-tilt';

const Logo = ({onTypeChange}) => {
        return(
            <div>
                <div className='center ma2 mt0'>
                    <p id="titleOfApp" className="f2 fw6 ph0 mh0">Choose the type of App you want</p>
                </div>
                <div className='center ma2 mt0'>
                    <Tilt className="Tilt2 mh3 br2 shadow-2 pointer" options={{ max : 45 }} style={{ height: 130, width: 130 }} >
                    <div onClick={()=>onTypeChange('FACE_DETECT_MODEL')} className="Tilt-inner pa4"><img style={{paddingTop:'5px'}} alt='manlogo' src={manLogo}/> </div>
                    </Tilt>
                    <Tilt className="Tilt mh3 br2 shadow-2 pointer" options={{ max : 45 }} style={{ height: 130, width: 130 }} >
                    <div onClick={()=>onTypeChange('FOOD_MODEL')} className="Tilt-inner pa4"><img style={{paddingTop:'5px'}} alt='foodlogo' src={foodLogo}/> </div>
                    </Tilt>
                </div>   
            </div>
           );
}
export default Logo;