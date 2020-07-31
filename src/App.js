import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageInputForm from './components/ImageInputForm/ImageInputForm';
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value:50,
    },
    size: {
      value: 3
    }
  }
}
const initialState={
  input:'',
  imageURL:'',
  box:{},
  route: 'signin',
  typeApp:'face',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:'',
      box:{},
      route: 'signin',
      typeApp:'FACE_DETECT_MODEL',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }
  }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }

    })
  }
  // IF Face detection selected :
  calculateFaceLoaction=(data)=>{
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifiFace.left_col*width,
      topRow: clarifiFace.top_row*height,
      rightCol: width-(clarifiFace.right_col*width),
      bottomRow: height-(clarifiFace.bottom_row*height)
    }
   }
   displayFaceBox=(box)=>{
     this.setState({box: box})
   }
  // IF Food detection selected :

  onInputChange=(event)=>{
   this.setState({input: event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageURL:this.state.input});
    fetch('https://nameless-ravine-84770.herokuapp.com/imageurl/',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
          input: this.state.input,
          typeOfApi: this.state.typeApp
      })
    })
    .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('https://nameless-ravine-84770.herokuapp.com/image/',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                id:this.state.user.id
            })
        }).then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        }).catch(console.log)
      }
      if(this.state.typeApp==='FACE_DETECT_MODEL'){
        this.displayFaceBox(this.calculateFaceLoaction(response))
      }
      else if(this.state.typeApp==='FOOD_MODEL')
      console.log(response.outputs[0].data.concepts);
      document.getElementById('foodText').style.visibility= "visible";
      document.getElementById("foodText").innerHTML = `This is probably : ${response.outputs[0].data.concepts[0].name}`;
    })
    .catch(err=>console.log(err));
  }
  
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState)
    }
    else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }
  
  onTypeChange=(typeApp)=>{
    this.setState({typeApp:typeApp})
    document.getElementById("titleOfApp").innerHTML = typeApp;
  }
  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'home'
          ? <div>
          <Logo onTypeChange={this.onTypeChange} />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageInputForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <p id='foodText' style={{visibility:"hidden"}} className="f3 link dim red db">S</p>
          <FaceRecognition box={this.state.box}imageURL={this.state.imageURL}/>
          </div>
          :(
            this.state.route==='signin'
            ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
      </div>
    );
  }
}

export default App;
