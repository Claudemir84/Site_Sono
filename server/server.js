const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./src/config/database');
const RegistroController = require('./src/controllers/RegistroController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
const router = express.Router();
router.get('/registros', RegistroController.index);
router.post('/registros', RegistroController.store);
router.put('/registros/:id', RegistroController.update);
router.delete('/registros/:id', RegistroController.delete);

app.use(router);

// Sincroniza o banco e inicia o servidor
database.sync().then(() => {
    app.listen(3001, () => {
        console.log('Servidor rodando na porta 3001');
    });
});