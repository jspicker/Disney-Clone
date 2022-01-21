import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import db from "../firebase"

function Detail() {

    const { id } = useParams();
    const [ movie, setMovie ] = useState();

    useEffect(()=>{ 
        // grab the movie
        db.collection("movies")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists) {
                //save the movie data
                setMovie(doc.data());
            }
            else {
                //redirect to homepage/error page
            }
        })
    }, [])

    return (
        <Conatiner>
            {movie &&  (
                <>
              <Background>
              <img src={movie.cardImg} />
          </Background>
          <ImageTitle>
              <h2>{movie.title}</h2>
          </ImageTitle>
          <Controls>
              <Playbutton>
                  <img src="/images/play-icon-black.png" />
                  <span>PLAY</span>
              </Playbutton>
              <TrailorButton>
              <img src="/images/play-icon-white.png" />
                  <span>Trailor</span>
              </TrailorButton>
              <AddButton>
                  <span>+</span>
              </AddButton>
              <GroupWatchButton>
                  <img src="/images/group-icon.png" />
              </GroupWatchButton>
          </Controls>
          <Subtitle>
              {movie.subTitle}
          </Subtitle>
          <Description>
              {movie.desc}
          </Description>
           </> )}
          
        </Conatiner>
    )
}

export default Detail

const Conatiner = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    margin-top: 120px;
`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.4;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

`
const ImageTitle = styled.div`
    min-height: 5vh;
    width: 35vw;
    min-height: 170px;
    min-width: 200px;
    font-size: 60px;
    margin-bottom: 40px
`

const Controls = styled.div`
    display: flex;
    align-items: center;
`

const Playbutton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 56px;
    background-color: rgb(249, 249, 249);
    border: none;
    padding: 0px 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background-color: rgb(198, 198, 198);
    }
`

const TrailorButton = styled(Playbutton)`
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
    text-transform: uppercase;
    &:hover {
        background-color: rgb(0, 0, 0);
    }
`

const AddButton = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    border: 2px solid #FFF;
    cursor: pointer;

    span {
        font-size: 30px;
        color: #FFF;
    }
`

const GroupWatchButton = styled(AddButton)`
background-color: rgb(0, 0, 0);
`

const Subtitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`
const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`