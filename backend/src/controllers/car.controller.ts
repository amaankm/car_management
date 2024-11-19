import { Request, Response } from "express";
import Car from "../models/car.model";

// Create a new car
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, tags, images } = req.body;

    if (images.length > 10) {
      res.status(400).json({ message: "You can upload up to 10 images only." });
      return;
    }

    const newCar = new Car({
      title,
      description,
      tags,
      images,
      user: req.user.userId, // Assuming req.user contains the authenticated user's ID
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ message: "Failed to create car", error });
  }
};

// Get all cars for the authenticated user
export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find({ user: req.user.userId });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cars", error });
  }
};

// Get a car by its ID
export const getCarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const car = await Car.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve car", error });
  }
};

// Update a car's details
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, tags, images } = req.body;

    if (images && images.length > 10) {
      res.status(400).json({ message: "You can upload up to 10 images only." });
      return;
    }

    const updatedCar = await Car.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description, tags, images },
      { new: true }
    );

    if (!updatedCar) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: "Failed to update car", error });
  }
};

// Delete a car
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCar = await Car.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!deletedCar) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete car", error });
  }
};

// Search cars by a keyword in title, description, or tags
export const searchCars = async (req: Request, res: Response) => {
  try {
    const keyword = req.params.keyword;

    const cars = await Car.find({
      user: req.user.userId,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to search cars", error });
  }
};
