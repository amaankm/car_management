import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCars,
} from "../controllers/car.controller";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

// Middleware for authentication
router.use(authenticateUser);

// Route to create a new car
/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car listing
 *     description: Create a new car entry with details such as title, description, tags, and images. The authenticated user's ID is associated with the car entry.
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the car listing.
 *                 example: "Toyota Camry 2022"
 *               description:
 *                 type: string
 *                 description: Detailed description of the car.
 *                 example: "A well-maintained 2022 Toyota Camry with low mileage."
 *               tags:
 *                 type: array
 *                 description: Tags associated with the car listing.
 *                 items:
 *                   type: string
 *                 example: ["Sedan", "Automatic", "New"]
 *               images:
 *                 type: array
 *                 description: Array of image URLs for the car. A maximum of 10 images is allowed.
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: [
 *                   "https://example.com/car1.jpg",
 *                   "https://example.com/car2.jpg"
 *                 ]
 *     responses:
 *       201:
 *         description: Car listing created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64bfcdf2e40d324d64e76aef"
 *                 title:
 *                   type: string
 *                   example: "Toyota Camry 2022"
 *                 description:
 *                   type: string
 *                   example: "A well-maintained 2022 Toyota Camry with low mileage."
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Sedan", "Automatic", "New"]
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: uri
 *                   example: [
 *                     "https://example.com/car1.jpg",
 *                     "https://example.com/car2.jpg"
 *                   ]
 *                 user:
 *                   type: string
 *                   example: "64bfcd0e39cd324d64e76aef"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *       400:
 *         description: Validation error (e.g., too many images).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You can upload up to 10 images only."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create car"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.post("/", createCar);

// Route to get all cars for the authenticated user
/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Retrieve cars for the authenticated user
 *     description: Fetch all cars created by the authenticated user.
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64bfcdf2e40d324d64e76aef"
 *                   title:
 *                     type: string
 *                     example: "Toyota Camry 2022"
 *                   description:
 *                     type: string
 *                     example: "A well-maintained 2022 Toyota Camry with low mileage."
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Sedan", "Automatic", "New"]
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: uri
 *                     example: [
 *                       "https://example.com/car1.jpg",
 *                       "https://example.com/car2.jpg"
 *                     ]
 *                   user:
 *                     type: string
 *                     example: "64bfcd0e39cd324d64e76aef"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-16T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-16T12:34:56.789Z"
 *       500:
 *         description: Failed to retrieve cars due to a server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve cars"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.get("/", getCars);

// Route to get details of a specific car by ID
/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Retrieve a specific car by ID
 *     description: Fetch a car owned by the authenticated user using its unique ID.
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the car to retrieve
 *         example: "64bfcdf2e40d324d64e76aef"
 *     responses:
 *       200:
 *         description: Successfully retrieved the car.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64bfcdf2e40d324d64e76aef"
 *                 title:
 *                   type: string
 *                   example: "Toyota Camry 2022"
 *                 description:
 *                   type: string
 *                   example: "A well-maintained 2022 Toyota Camry with low mileage."
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Sedan", "Automatic", "New"]
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: uri
 *                   example: [
 *                     "https://example.com/car1.jpg",
 *                     "https://example.com/car2.jpg"
 *                   ]
 *                 user:
 *                   type: string
 *                   example: "64bfcd0e39cd324d64e76aef"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *       404:
 *         description: Car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car not found"
 *       500:
 *         description: Failed to retrieve car due to a server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve car"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.get("/:id", getCarById);

// Route to update a car by ID
/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a specific car by ID
 *     description: Update the details of a car owned by the authenticated user. Allows updating the title, description, tags, and images. Limits the number of images to 10.
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the car to update.
 *         example: "64bfcdf2e40d324d64e76aef"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Toyota Camry 2022"
 *               description:
 *                 type: string
 *                 example: "An updated description of the Toyota Camry."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Updated", "Automatic", "Luxury"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: [
 *                   "https://example.com/car1-updated.jpg",
 *                   "https://example.com/car2-updated.jpg"
 *                 ]
 *     responses:
 *       200:
 *         description: Successfully updated the car.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64bfcdf2e40d324d64e76aef"
 *                 title:
 *                   type: string
 *                   example: "Updated Toyota Camry 2022"
 *                 description:
 *                   type: string
 *                   example: "An updated description of the Toyota Camry."
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Updated", "Automatic", "Luxury"]
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: uri
 *                   example: [
 *                     "https://example.com/car1-updated.jpg",
 *                     "https://example.com/car2-updated.jpg"
 *                   ]
 *                 user:
 *                   type: string
 *                   example: "64bfcd0e39cd324d64e76aef"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T13:00:00.123Z"
 *       400:
 *         description: Validation error (e.g., too many images).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You can upload up to 10 images only."
 *       404:
 *         description: Car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car not found"
 *       500:
 *         description: Server error while updating the car.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update car"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.put("/:id", updateCar);

// Route to delete a car by ID
/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a specific car by ID
 *     description: Deletes a car owned by the authenticated user. The car is identified by its unique ID.
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the car to delete.
 *         example: "64bfcdf2e40d324d64e76aef"
 *     responses:
 *       200:
 *         description: Successfully deleted the car.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car deleted successfully"
 *       404:
 *         description: Car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car not found"
 *       500:
 *         description: Server error while deleting the car.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete car"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.delete("/:id", deleteCar);

// Route to search cars by keyword
/**
 * @swagger
 * /cars/search/{keyword}:
 *   get:
 *     summary: Search cars by keyword
 *     description: Searches cars owned by the authenticated user using a keyword. The keyword is matched against the car's title, description, and tags fields.
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: The keyword to search for.
 *         example: "electric"
 *     responses:
 *       200:
 *         description: Successfully retrieved the matching cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64bfcdf2e40d324d64e76aef"
 *                   title:
 *                     type: string
 *                     example: "Tesla Model 3"
 *                   description:
 *                     type: string
 *                     example: "Electric car with autopilot feature"
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["electric", "sedan"]
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["image1.jpg", "image2.jpg"]
 *                   user:
 *                     type: string
 *                     example: "64bfcdf2e40d324d64e76aef"
 *       500:
 *         description: Server error while searching cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to search cars"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.get("/search/:keyword", searchCars);

export default router;
