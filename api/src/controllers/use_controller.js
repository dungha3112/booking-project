import User_model from '../models/User_model.js'

export const updateUser = async (req, res, next) => {
  const idUserToUpdate = req.params.id
  try {
    const updatedUser = await User_model.findByIdAndUpdate(idUserToUpdate, { $set: req.body}, { new : true})
    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  const idUserToDelete = req.params.id
  try {
    await User_model.findByIdAndDelete(idUserToDelete)
    res.status(200).json('User has been deleted.')
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res, next) => {
  const idUserToFind = req.params.id
  try {
    const user = await User_model.findById(idUserToFind)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User_model.find()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}
