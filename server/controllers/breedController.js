import { BreedService } from "../services/breed.service.js";

const service = new BreedService();

const getAllBreeds = async (req, res) => {
  try {
    const response = await service.getAllBreeds();
    if (response.length > 0) {
      return res.json(response );
    }
  } catch (error) {
    return res.status(401).json({
      suscces: false,
      message:error.message
    })
  }
}



const createBreed = async (req, res) => {
  try {
    const response = await service.createBreed(req.body);
    if (response) {
      return res.json({
        suscces: true,
        message: "Registro Exitoso🤓",
      })
    }
  } catch (error) {
    return res.status(500).send({
      suscces: false,
      message: error.message,
    })
  }
};
const getIdBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getIdBreed(id);
    return res.json({response});
  } catch (error) {
    return res.status(500).json({
      suscces: false,
      message: error.message,
    })
  }
};
const updateIdBreed = async (req, res) => {
  try {
    //const { id } = req.params;
    const { id } = req.body;
    const response = await service.updateBreedById(id,req.body);
    if (response) {
      return res.json({
        suscces: response,
        message:"Actualizacion exitosa 🤓"
      });
      
    }
  } catch (error) {
    return res.status(500).json({
      suscces: false,
      message: error.message,
    })
  }
};

const deleteIdBreed = async (req, res) => {
  const { id } = req.params;
  const response = await service.deleteBreedById(id);
  if (response) {
    res.json({
      suscces: response,
      message:"Eliminacion Exitosa 👋🏽"
    })
  } else {
    res.json({
      suscces: false,
      message:"Breed no existe😢"
    })
  }
}

export const breedController = {
  getAllBreeds,
  createBreed,
  getIdBreed,
  updateIdBreed,
  deleteIdBreed
}