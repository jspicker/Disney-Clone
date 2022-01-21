 import React, { useEffect } from 'react'
 import styled from 'styled-components'
 import { auth, provider } from '../firebase'
 import { useHistory } from 'react-router-dom'
 import {
    selectUserName,
    selectUserPhoto,
   setUserLogin,
   setSignOut
} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
 



 function Login() {

  
    const dispatch = useDispatch();
    let history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    
    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push('/');
            }
            if(!user){
                history.push('/login');
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result)=>{
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push('/');
        })
    }


     return (
         <Container>
             <ContentBox>
                <CTALogoOne src="/images/cta-logo-one.svg" />
                <SignUp onClick={signIn}>
                    Get all there
                </SignUp>
                <Description>
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam,
                </Description>
                <CTALogoTwo  src="/images/cta-logo-two.png" />
             </ContentBox>
         </Container>
     )
 }
 
 export default Login
 
 const Container = styled.div`
      position: relative;
      height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        content: "";
        left: 0;
        right: 0;
        background-image: url("/images/login-background.jpg");
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
        opacity: 0.7;
        z-index: -1;
      }
 `

 const ContentBox = styled.div`
      max-width: 650px;
      padding: 80px 40px;
      width: 90%;
      display:flex;
      flex-direction: column;
      align-items: center;
 `

 const CTALogoOne = styled.img`
      width: 100%;
 `

 const SignUp = styled.a`
      width: 100%;
      background-color: #0063e5;
      font-weight: bold;
      padding: 17px 0;
      color: #f9f9f9;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      font-size: 18px;
      transition: all 250ms;
      letter-spacing: 1.5px;
      margin-top: 8px;
      margin-bottom: 12px;

      &:hover {
          background-color: #0483ee;
      }
 `

 const Description = styled.p`
    font-size: 11px;
    letter-spacing: 1.5px;
    text-align: center;
    line-height: 1.5;
 `
 const CTALogoTwo = styled.img`
      width:90%;

 `