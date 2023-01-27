import React from 'react'

export default function CatFact({fact}) {
    
  return (
    <li className="cat-fact-div">
        {fact.text}
    </li>
  )
}
