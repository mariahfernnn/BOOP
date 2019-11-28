const router = require("express").Router();

module.exports = db => {
  // Get all pets
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM pets`)
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pets' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get all pet photos
  router.get("/images", (req, res) => {
    db.query(
      `SELECT pets.name AS name,
              images.url AS photo 
      FROM images
      JOIN pets ON pets.id = pet_id`)
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pet pictures' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get all pet favourites
  router.get("/favourites", (req, res) => {
    db.query(
      `SELECT pets.name AS pet,
              pet_favourites.category AS category, 
              pet_favourites.name AS name
      FROM pet_favourites
      JOIN pets ON pets.id = pet_id`)
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pet favourites' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet and its favourite things by id
  router.get("/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.name AS name, 
              pets.age AS age, 
              pets.breed AS breed, 
              pets.quirky_fact AS quirky_fact, 
              pets.profile_photo AS profile_photo,
              users.first_name AS owner,
              users.city AS home,
              pet_favourites.category AS category, 
              pet_favourites.name AS favourite_item
      FROM pets
      JOIN pet_favourites ON pet_id = pets.id
      JOIN users ON users.id = pets.owner_id
      WHERE pets.id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved all the information about a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet's photos by id
  router.get("/images/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.name AS name,
              images.url AS picture
      FROM pets
      JOIN images ON images.pet_id = pets.id
      WHERE pets.id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved the images of a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Add a new pet
  // Removed the owner_id since we are using req.session.user_id now
  // Only the owner that is logged in can add a new pet on their profile
  router.post("/", (req, res) => {
    const userId = req.session.user_id
    db.query(
      `INSERT INTO pets (name, age, breed, quirky_fact, profile_photo)
      VALUES ($1, $2, $3, $4, $5)`
      , [req.body.name, parseInt(req.body.age), req.body.breed, req.body.quirky_fact, req.body.profile_photo])
    .then(result => {
      res.status(201) 
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Added a new pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Add a new favourite thing
  // This will be associated with a form on the front-end
  // Only the owner that is logged in can add a favourite thing for their pet
  router.post("/favourites/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `INSERT INTO pet_favourites (name, category, pet_id)
      VALUES($1, $2, $3)`
      , [req.body.name, req.body.category, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Added a new favourite item' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Upload a new image
  // Only the owner that is logged in can upload photos of their pet
  router.post("/images/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `INSERT INTO images (url, pet_id)
      VALUES($1, $2)`
      , [req.body.url, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Added a new image' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Edit an existing pet's info by id
  // Changed owner_id as a value to userId since we are using req.session.user_id now
  // Only the owner that is logged in can edit the info of their pets
  router.put("/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `UPDATE pets
      SET name=$1, age=$2, breed=$3, quirky_fact=$4, profile_photo=$5
      WHERE id=$6`
      , [req.body.name, parseInt(req.body.age), req.body.breed, req.body.quirky_fact, req.body.profile_photo, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Updated the info of an existing pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Delete an existing pet by id
  // Only the owner that is logged in can delete their pets
  router.delete("/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `DELETE FROM pets
      WHERE id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        message: `Removed ${result.rowCount} pet` 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};

