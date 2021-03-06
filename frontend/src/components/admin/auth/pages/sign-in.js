import React, { useState, useEffect } from 'react';
import MyForm from '../utilities/form';
import { Container, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { login } from '../../../../redux/actions/authActions';
import { clearErrors } from '../../../../redux/actions/errorActions';
import { useHistory } from 'react-router-dom';


const SignIn=({
    isAuthenticated,
    error,
    login,
    clearErrors
  })=>{

    const history= useHistory();
    const [stillSubmitting, setSubmitting]= useState(false);
    const [msg, setMsg] = useState(null);

    function handleSubmit({email, password}){
        setSubmitting(true);
        // console.log({email, password});
         // Create user object
            const user = {
                email,
                password
            };

            async function log (){
              await login(user);

            }

            // Attempt to login
            log().then((res)=>{
              setSubmitting(false);
            })
    }

    useEffect(() => {
        // Check for register error
        if (error.id === 'LOGIN_FAIL') {
          setMsg(error.msg.msg);
          setSubmitting(false);

        } else {
          setMsg(null);
        }

        // If authenticated
          if (isAuthenticated) {
            // clearErrors();
            // console.log(isAuthenticated)
            history.push('/admin')
            // window.location.href='/home'
          }
    
        //   if (isAuthenticated===null){
        //     setLoading(false)
        // };
      }, [error, isAuthenticated]);

    return(
        <>
        <Container className='mb-2'>
        <h2 className='m-auto text-center playfair'>Sign In</h2>
        </Container>
        <Container className='auth-container'>
        {msg ? <Alert className='text-center' variant="dark">{msg}</Alert> : null}
            {/* <h4 className='m-auto text-center playfair'>Sign In</h4> */}

            <MyForm 
                handleClickLabel='Sign In' 
                handleSubmit={handleSubmit}
                email
                password
                stillSubmitting={stillSubmitting}

            />
        </Container>

        </>
    )
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
  
export default connect(mapStateToProps, { login, clearErrors })(SignIn);


