import React from 'react';

class Signin extends React.Component{
    constructor(props){
        super();
        this.state={
            signinEmail:'',
            signinPassword:''
        }
    }
    onEmailChange=(event)=>{
        this.setState({signinEmail:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({signinPassword:event.target.value})
    }
    onSubmitSignIn=(event)=>{
        event.preventDefault();
        fetch('https://nameless-ravine-84770.herokuapp.com/signin/',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.signinEmail,
                password:this.state.signinPassword
            })
        }).then(response=>response.json())
        .then(user=>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home')}
            else{
                document.getElementById('errormsg').style.visibility= "visible";
                document.getElementById("errormsg").innerHTML = user;
            }
        })
    }
    render(){
        const{onRouteChange}=this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            onChange={this.onEmailChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                             onChange={this.onPasswordChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <p id='errormsg' style={{visibility:"hidden"}} className="f6 link dim red db">Something</p>
                        <input
                        onClick={this.onSubmitSignIn}
                         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                         type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('Register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}
export default Signin;