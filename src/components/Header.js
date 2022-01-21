import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, provider } from '../firebase'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
    selectUserName,
    selectUserPhoto,
   setUserLogin,
   setSignOut
} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"


function Header() {
    
    const imageUser = useSelector(selectUserPhoto);
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

    const signOut = () => {
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut());
            history.push("/login");
        })
    }

    return (
        <Nav>
            <Link to="/">
            <Logo src="/images/logo.svg" />
            </Link>
            { !userName ? ( 
                <LoginContainer>
                     <Login onClick={signIn}>Login</Login>
                </LoginContainer>
                ):
                <>
                <NavMenu>
                <Link to="/">
                    <img src="/images/home-icon.svg" />
                    <span>Home</span>
                </Link>
                <a href="#">
                    <img src="/images/search-icon.svg" />
                    <span>search</span>
                </a>
                <a href="#">
                    <img src="/images/watchlist-icon.svg" />
                    <span>Watchlist</span>
                </a>
                <a href="#">
                    <img src="/images/original-icon.svg" />
                    <span>originals</span>
                </a>
                <a href="#">
                    <img src="/images/movie-icon.svg" />
                    <span>movies</span>
                </a>
                <a href="#">
                    <img src="/images/series-icon.svg" />
                    <span>series</span>
                </a>
            </NavMenu>
            <UserImg onClick={signOut} src={imageUser} />
            </>
            }
          
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background-color: #090b13;
    display: flex;
    align-items: center;
    padding: 0px 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`
const NavMenu = styled.div`

    display:flex;
    align-items: center;
    flex: 1;
    margin-left: 20px;

    a {
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: #FFF;
        text-decoration: none;
        text-transform: uppercase;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: #FFF;
                position: absolute;
                left:0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);

            }
        }

        &:hover {
            span:after {
                opacity: 1;
                transform: scaleX(1);
            }
        }

    }
`


const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 250ms ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`