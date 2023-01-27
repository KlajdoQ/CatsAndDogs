import React from 'react'


export default function DogFact({fact}) {
  return (
    <div>
      <li className="dog-fact"> {fact.text}</li>
    </div>
  )
}
