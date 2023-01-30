import React, {useState, useEffect} from 'react'
import CatFact from './CatFact'
import CatsHeader from './CatsHeader'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 350px;
  height: 430px;
  @media (max-width:600px) {
    display:none;
  }
`

const List = styled.ol`
  display: flex;
  flex-direction: column;
`

export default function CatFactsList() {
  const [facts, setFacts] = useState([])


  useEffect(() =>{
    fetch('https://cat-fact.herokuapp.com/facts')
    .then((response) =>response.json())
    .then(setFacts)
  },[])



  return ( 
    <Wrapper>
      <CatsHeader />
      <List>
        {facts.map(fact => (
          <CatFact key={fact.text} fact={fact}/>
        ))}
      </List>
    </Wrapper>
  )
}
