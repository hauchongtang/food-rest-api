import React, { useState } from 'react'
import axios from 'axios'

const FoodTable = () => {
  const [food, setFood] = useState([])

  const serverAddress = 'http://localhost:5000'

  // GET /api/foodplaces
  axios.get(`/api/foodplaces`)
    .then((response) => {
      setFood(response.data.data)
    })
  const dateArr = food.map(f => f.beautifyDate)
  const nameArr = food.map(f => f.name)
  const genreArr = food.map(f => f.genre)
  const locationArr = food.map(f => f.location)
  const busArr = food.map(f => f.bus)
  const trainArr = food.map(f => f.train)
  const countryArr = food.map(f => f.country)
  const idArr = food.map(f => f._id)

  const foodTable = nameArr
    .map((item, idx) => {
      return (
        <tr>
          <td>{item}</td>
          <td>{genreArr[idx]}</td>
          <td>{locationArr[idx]}</td>
          <td>{countryArr[idx]}</td>
          <td>{busArr[idx]}</td>
          <td>{trainArr[idx]}</td>
          <td>{dateArr[idx]}</td>
          <td>{idArr[idx]}</td>
        </tr>
      )
    })


  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Genre</th>
        <th>Location</th>
        <th>Country</th>
        <th>Bus</th>
        <th>Train</th>
        <th>Date Added</th>
        <th>ID</th>
      </tr>
      <tbody>
        {foodTable}
      </tbody>
    </table>
  )
}

export default FoodTable