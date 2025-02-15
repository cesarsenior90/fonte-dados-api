import fastify from 'fastify';

const app = fastify();

app.get('/', (req, res) => {
  return res.status(200).send("Hello World!");
});

const data = Array.from({ length: 100 }, (_, index) => ({
  linha: `Linha ${index + 1}`,
  campo: `Campo ${index + 1}`,  // Adicionando o atributo 'campo'
}));

// Rota de exemplo
app.get('/api', (request, res) => {
  // @ts-ignore
  const offset = parseInt(request.query.offset) || 0;  // Valor default 0
  // @ts-ignore
  const size = parseInt(request.query.size) || 20;    // Valor default 30
  // @ts-ignore
  console.log('offset', request.query.offset);
  // @ts-ignore
  console.log('size', request.query.size);

  // Verificando se o tamanho solicitado não é maior que 30
  const validSize = Math.min(size, 30);

  // Validando o offset
  if (offset < 0) {
    return res.status(400).send({ error: 'Offset não pode ser negativo' });
  }

  // Calculando o slice da lista com base no offset e no size
  const startIndex = offset;
  const endIndex = startIndex + validSize;

  // Retornando as linhas solicitadas
  const result = data.slice(startIndex, endIndex);

  res.send({
    offset,
    size: validSize,
    data: result,
  });
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.port) : 3333
}).then(() => {
  console.log('Server is running');
})