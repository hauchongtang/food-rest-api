import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'

const InputForm = () => {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [country, setCountry] = useState('')
  const [location, setLocation] = useState('')
  const [bus, setBus] = useState('')
  const [train, setTrain] = useState('')
  const [id, setId] = useState('')

  const serverAddress = 'http://localhost:5000'

  // Handling events
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handeGenreChange = (event) => {
    setGenre(event.target.value)
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleBusChange = (event) => {
    setBus(event.target.value)
  }

  const handleTrainChange = (event) => {
    setTrain(event.target.value)
  }

  const handleIdChange = (event) => {
    setId(event.target.value)
  }

  // Submission of form
  const handleSubmit = async (event) => {
    const placesObject = {
      name: name,
      genre: genre,
      location: location,
      country: country,
      bus: bus,
      train: train
    }
    // POST to api/foodplaces
    await axios
      .post(`/api/foodplaces`, placesObject, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text" name="Name" id="name" placeholder="Input the food name"
            onChange={handleNameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Genre</Label>
          <Input
            type="text" name="Genre" id="genre" placeholder="Input the genre"
            onChange={handeGenreChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Location</Label>
          <Input
            type="text" name="Location" id="location" placeholder="Input the location"
            onChange={handleLocationChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Country</Label>
          <Input
            type="text" name="Country" id="Country" placeholder="Input the country"
            onChange={handleCountryChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Bus</Label>
          <Input
            type="text" name="Bus" id=""
            placeholder="Input the bus svcs with a comma(no need for inverted commas): example --> '109, 250'"
            onChange={handleBusChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Nearest Train Station</Label>
          <Input
            type="text" name="Train" id="train" placeholder="Input the nearest train station"
            onChange={handleTrainChange}
          />
        </FormGroup>
        <button type='submit'>Submit</button>
      </Form>
    </>
  )
}

export default InputForm