const { Tea } = require('../../db/models');

class TeaService {
  static async getAllTeas() {
    const teas = await Tea.findAll();
    return teas.map(el => el.get({ plain: true }));
  }

  static async getOneTeaById(id) {
    const tea = await Tea.findByPk(id);
    if (!tea) throw new Error('Tea not found');
    return tea.get({ plain: true });
  }

  static async getFavsById(ids) {
    const teas = await Tea.findAll({ where: { id: ids } });
    return teas.map(el => el.get({ plain: true }));
  }

  static async createTea(teaData) {
    const tea = await Tea.create(teaData);
    return tea.get({ plain: true });
  }

  static async deleteTea(id) {
    const deletedCount = await Tea.destroy({ where: { id } });
    if (deletedCount === 0) throw new Error('Tea not found');
    return { success: true };
  }
}

module.exports = TeaService;