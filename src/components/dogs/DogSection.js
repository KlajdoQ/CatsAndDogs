import React,{useState,useEffect} from 'react'
import DogsHeader from './DogsHeader'
import DogFact from './DogFact'
import FeaturedDogHeader from './FeaturedDogHeader'
import FeaturedDog from './FeaturedDog'

export default function DogFactsList() {
  const [dogFact, setDogFact] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/dogFacts')
    .then(response => response.json())
    .then(setDogFact)
  },[])
return (
    <div className="dog-facts-div">
      <DogsHeader />
     <ol>
        {
          dogFact.map(fact => (
            <DogFact fact={fact} key={fact.id}/>
          ))
        }
     </ol>
     <FeaturedDogHeader />
     <FeaturedDog/>
    </div>
  )
}
