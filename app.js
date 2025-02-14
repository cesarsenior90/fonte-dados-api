const express = require('express');
const app = express();
const port = 3000;

// Rota básica
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});


const data = Array.from({ length: 100 }, (_, index) => ({
    linha: `Linha ${index + 1}`,
    campo: `Campo ${index + 1}`,  // Adicionando o atributo 'campo'
}));

// Rota de exemplo
app.get('/api', (req, res) => {
    const offset = parseInt(req.query.offset) || 0;  // Valor default 0
    const size = parseInt(req.query.size) || 20;    // Valor default 30
    console.log('offset', req.query.offset);
    console.log('size', req.query.size);

    // Verificando se o tamanho solicitado não é maior que 30
    const validSize = Math.min(size, 30);

    // Validando o offset
    if (offset < 0) {
        return res.status(400).json({ error: 'Offset não pode ser negativo' });
    }

    // Calculando o slice da lista com base no offset e no size
    const startIndex = offset;
    const endIndex = startIndex + validSize;

    // Retornando as linhas solicitadas
    const result = data.slice(startIndex, endIndex);

    res.json({
        offset,
        size: validSize,
        data: result,
    });
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
