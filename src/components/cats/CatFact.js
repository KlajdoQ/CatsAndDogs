import React from 'react'
import styled from 'styled-components'

const CatFactDiv = styled.li`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

export default function CatFact({ fact }) {
  return (
    <CatFactDiv>
        {fact.text}
    </CatFactDiv>
  )
}
