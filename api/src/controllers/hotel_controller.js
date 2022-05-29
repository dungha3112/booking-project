import Hotel_model from "../models/Hotel_model.js"
import Room_model from "../models/Room_model.js"


export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel_model(req.body)
  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
  }
}

export const updateHotel = async (req, res, next) => {
  const idHotelToUpdate = req.params.id
  try {
    const updatedHotel = await Hotel_model.findByIdAndUpdate(idHotelToUpdate, { $set: req.body}, { new : true})
    res.status(200).json(updatedHotel)
  } catch (err) {
    next(err)
  }
}

export const deleteHotel = async (req, res, next) => {
  const idHotelToDelete = req.params.id
  try {
    await Hotel_model.findByIdAndDelete(idHotelToDelete)
    res.status(200).json('Hotel has been deleted.')
  } catch (err) {
    next(err)
  }
}

export const getHotel = async (req, res, next) => {
  const idHotelToFind = req.params.id
  try {
    const hotel = await Hotel_model.findById(idHotelToFind)
    res.status(200).json(hotel)
  } catch (err) {
    next(err)
  }
}

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query
  try {
    const hotels = await Hotel_model.find({...others, cheapPrice:{$gt:min | 1, $lte:max || 999999999 }}).limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel_model.countDocuments({city: city})
    }))
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount      = await Hotel_model.countDocuments({type: 'hotel'})
    const apartmentCount  = await Hotel_model.countDocuments({type: 'apartment'})
    const resortCount     = await Hotel_model.countDocuments({type: 'resort'})
    const villaCount      = await Hotel_model.countDocuments({type: 'villa'})
    const cabinCount      = await Hotel_model.countDocuments({type: 'cabin'})
    res.status(200).json([
      {type: 'hotel'    , count: hotelCount},
      {type: 'apartment', count: apartmentCount},
      {type: 'resort'   , count: resortCount},
      {type: 'villa'    , count: villaCount},
      {type: 'cabin'    , count: cabinCount}
    ])
  } catch (err) {
    next(err)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel_model.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room_model.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
