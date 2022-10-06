const express = require("express");
const router = express.Router();

const anime_controller = require("../controllers/animeControllers");
const animeCreate_controller = require("../controllers/creatorContollers");
const genre_controller = require("../controllers/genreControllers");
const availability_controller = require("../controllers/availabilityController");

//ANIME ROUTES

//GET catalog homepage
router.get('/',anime_controller.index);

//GET request for creating a anime
router.get("/anime/create",anime_controller.anime_create_get);

//POST request for creating a anime
router.post("/anime/create",anime_controller.anime_create_post);

//GET request for deleting a anime
router.get("/anime/:id/delete",anime_controller.anime_delete_get);

//POST request for deleting a anime
router.post("/anime/:id/delete",anime_controller.anime_delete_post);

//GET request for updating a anime
router.get("/anime/:id/update",anime_controller.anime_update_get);

//POST request for updating a anime
router.post("/anime/:id/update",anime_controller.anime_update_post);

//GET request for one anime
router.get("/anime/:id",anime_controller.anime_detail);

//GET request for list of anime
router.get("/animes",anime_controller.anime_list);

//ANIMECREATER ROUTES

//GET request for creating a animecreater
router.get("/animecreater/create",animeCreate_controller.animeCreator_create_get);

//POST request for creating a animecreater
router.post("/animecreater/create",animeCreate_controller.animeCreator_create_post);

//GET request for deleting a animecreater
router.get("/animeCreator/:id/delete",animeCreate_controller.animeCreator_delete_get);

//POST request for deleting a animecreater
router.post("/animeCreator/:id/delete",animeCreate_controller.animeCreator_delete_post);

//GET request for updating a animecreater
router.get("/animeCreator/:id/update",animeCreate_controller.animeCreator_update_get);

//POST request for updating a animecreater
router.post("/animeCreator/:id/update",animeCreate_controller.animeCreator_update_post);

//GET request for one animecreater
router.get("/animeCreator/:id",animeCreate_controller.animeCreator_detail);

//GET request for list of animecreater
router.get("/animecreaters",animeCreate_controller.animeCreator_list);

//GENRE ROUTES

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

//AVAILABILITY 


// GET request for creating a availability. NOTE This must come before route that displays availability (uses id).
router.get("/availability/create", availability_controller.availability_create_get);

//POST request for creating availability.
router.post("/availability/create", availability_controller.availability_create_post);

// GET request to delete availability.
router.get("/availability/:id/delete", availability_controller.availability_delete_get);

// POST request to delete availability.
router.post("/availability/:id/delete", availability_controller.availability_delete_post);

// GET request to update availability.
router.get("/availability/:id/update", availability_controller.availability_update_get);

// POST request to update availability.
router.post("/availability/:id/update", availability_controller.availability_update_post);

// GET request for one availability.
router.get("/availability/:id", availability_controller.availability_detail);

// GET request for list of all availability.
router.get("/availabilities", availability_controller.availability_list);

module.exports = router;