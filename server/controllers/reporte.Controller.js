import { ReporteService } from "../services/reporte.service.js"; 

const service = new ReporteService();

const getByDia = async (req, res) => {
  try {
    const response = await service.getDia(req.body);
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

const getBySemana = async (req, res) => {
  try {
    const response = await service.getSemanal(req.body);
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

const getBySemanas = async (req, res) => {
  try {
    const response = await service.getSemanal(req.body);
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

const getByCobros = async (req, res) => {
  try {
    const response = await service.getCobro(req.body);
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
const getByCobrosGeneral = async (req, res) => {
  try {
    const response = await service.getCobroGeneral(req.body);
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

export const reporteController = {
  getByDia,
  getBySemana,
  getBySemanas,
  getByCobros,
  getByCobrosGeneral
};
