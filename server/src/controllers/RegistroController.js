const Registro = require('../models/Registro');

module.exports = {
    async index(req, res) {
        const registros = await Registro.findAll();
        return res.json(registros);
    },

    async store(req, res) {
        const { tipo, descricao, valor } = req.body;
        const registro = await Registro.create({ tipo, descricao, valor });
        return res.json(registro);
    },

    async update(req, res) {
        const { id } = req.params;
        const { tipo, descricao, valor } = req.body;
        await Registro.update({ tipo, descricao, valor }, { where: { id } });
        return res.json({ message: 'Atualizado com sucesso' });
    },

    async delete(req, res) {
        const { id } = req.params;
        await Registro.destroy({ where: { id } });
        return res.json({ message: 'Deletado com sucesso' });
    }
};