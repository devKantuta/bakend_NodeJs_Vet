import ConsultaService from "../services/consulta.service.js";

const service = new ConsultaService();

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
//creando data
const createData = async (req, res) => {
  try {
    const response = await service.createData(req.body);
    if (response) {
      return res.json({
        ok: true,
        message: "Registro Exitoso🤓",
      });
    }
    res.json({
      ok: false,
      message: "No existe conexion en la DATABASE🤯",
    });
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
    //const { id } = req.body.id;

    //const { id } = req.body;
    const response = await service.updateData(id, req.body);
    //response: si sale todo bien devulve true
    if (response) {
      return res.json({
        ok: response,
        message: "Actualizacion exitosa 🤓",
      });
    }
    res.json({
      ok: response,
      message: "No esta registrado 😢",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
// delete data
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.deleteData(id);
    if (response) {
      return res.json({
        ok: response,
        message: "Eliminacion Exitosa 👋🏽",
      });
    }
    //sino existe la data
    res.json({
      ok: false,
      message: "No existe el cliente😢",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
    console.log(error);
  }
};

export const consultaController = {
  getAllData,
  createData,
  updateData,
  deleteData,
};
