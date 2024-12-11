import ClienteService from "../services/cliente.service.js";


const service = new ClienteService();


const getAllData = async (req, res) => {
  try {
    const response = await service.getAllData();
    if (response.length > 0) {
      return res.json(response);
    }
  } catch (error) {
    //suc
    return res.status(401).json({
      ok: false,
      message: error.message,
    });
  }
};

const createData = async (req, res) => {
  try {
    const response = await service.createData(req.body);
    if (response) {
      return res.json({
        ok: true,
        message: "Registro Exitoso🤓",
      });
    }
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: error.message,
    });
  }
};
// actualizando data
const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    
    //const { id } = req.body;
    const response = await service.updateData(id, req.body);
    //response: si sale todo bien devulve true
    if (response) {
      return res.json({
        ok: response,
        message: "Actualizacion exitosa 🤓",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};


const deleteData = async (req, res) => {
  const { id } = req.params;
  const response = await service.deleteData(id);
  if (response) {
    res.json({
      ok: response,
      message: "Eliminacion Exitosa 👋🏽",
    });
  } else {
    res.json({
      ok: false,
      message: "No existe el cliente😢",
    });
  }
};

/* const getIdBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getIdBreed(id);
    return res.json({ response });
  } catch (error) {
    return res.status(500).json({
      suscces: false,
      message: error.message,
    });
  }
};

 */

export const clientController = {
  getAllData,
  createData,
  updateData,
  deleteData
};