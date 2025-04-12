const TeaService = require('../service/teaService');
const {Tea} = require('../../db/models')


class TeaController {
  // Получение всех чаёв
  static async getAll(req, res) {
    try {
      const teas = await TeaService.getAllTeas();
      res.json(teas);
    } catch (error) {
      console.error('Get all teas error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Получение одного чая
  static async getOne(req, res) {
    try {
      const tea = await TeaService.getOneTeaById(req.params.id);
      res.json(tea);
    } catch (error) {
      if (error.message === 'Tea not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Get one tea error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Получение избранных чаёв
  static async getFavs(req, res) {
    try {
      const ids = req.params.ids.split(',');
      const teas = await TeaService.getFavsById(ids);
      res.json(teas);
    } catch (error) {
      console.error('Get favorites error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Создание нового чая
  static async create(req, res) {
    try {
      const newTea = await TeaService.createTea(req.body);
      res.status(201).json(newTea);
    } catch (error) {
      console.error('Create tea error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Удаление чая
  static async delete(req, res) {
    try {
      await TeaService.deleteTea(req.params.id);
      res.status(204).end();
    } catch (error) {
      if (error.message === 'Tea not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Delete tea error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  // изменение 
 static async update(req, res) {
    try {
      const [updated] = await Tea.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedTea = await Tea.findByPk(req.params.id);
        return res.json(updatedTea);
      }
      throw new Error('Tea not found');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}

module.exports = TeaController;
