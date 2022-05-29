import Room_model from '../models/Room_model.js'
import Hotel_model from '../models/Hotel_model.js'
import { createError } from '../utils/err_util.js'

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotel_id
    const newRoom = new Room_model(req.body)

    try {
        const saveRoom = await newRoom.save()
        try {
            await Hotel_model.findByIdAndUpdate(hotelId, {$push: {rooms: saveRoom._id}})       
        } catch (err) {
            next(err)
        }
        res.status(200).json(saveRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
    const idRoomToUpdate = req.params.id
    try {
        const updatedRoom = await Room_model.findByIdAndUpdate(idRoomToUpdate, { $set: req.body}, { new : true})
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
  }
  
  export const deleteRoom = async (req, res, next) => {
    const idRoomToDelete = req.params.id
    const hotelId = req.params.hotel_id

    try {
      await Room_model.findByIdAndDelete(idRoomToDelete)
      try {
        await Hotel_model.findByIdAndUpdate(hotelId, {$pull: {rooms: idRoomToDelete}})       
        } catch (err) {
            next(err)
        }
        res.status(200).json('Room has been deleted.')
    } catch (err) {
        next(err)
    }
  }
  
  export const getRoom = async (req, res, next) => {
    const idRoomToFind = req.params.id
    try {
        const Room = await Room_model.findById(idRoomToFind)
        res.status(200).json(Room)
    } catch (err) {
        next(err)
    }
  }
  
  export const getAllRooms = async (req, res, next) => {
    try {
      const rooms = await Room_model.find()
      res.status(200).json(rooms)
    } catch (err) {
      next(err)
    }
  }
