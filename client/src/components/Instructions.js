import React from 'react'

const Instructions = () => {
  return (
    <>
      <h1>Instructions</h1>
      <p>This is a user input driven api. The purpose is to gather data on more exotic places to eat and dine.
        Why? This is because they are poorly represented in travel sites and even Google.</p>
      <p>It is reccomended to input all fields unless there is no info about it.</p>
      <p>To delete or update, you will need to use a client that can handle HTTP requests eg postman. This is to filter out bots from mis-deleting data from the api.</p>
      <p>Simply copy paste the id and key in all fields in json format.</p>
      <p>'https://(domainname)/api/foodplaces/(paste id here)</p>
      <p>To update, enter all fields again in json format and use the PATCH request</p>
      <p>To delete, simply paste id and send DELETE request</p>
      <p><a href='https://github.com/thchong-code/food-rest-api'>Github</a></p>
    </>
  )
}

export default Instructions