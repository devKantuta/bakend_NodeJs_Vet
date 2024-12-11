import { TurnoService } from "../services/turno.service.js";

const service = new TurnoService();

const getAllData = async (req, res) => {
  try {
    const response = await service.getAllData();
    if (response.length > 0) {
      return res.json(response);
    }
  } catch (error) {
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

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    //const { id } = req.body;
    const response = await service.updateData(id, req.body);
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
      message: "Breed no existe😢",
    });
  }
};

export const turnoController = {
  getAllData,
  createData,
  updateData,
  deleteData
};
