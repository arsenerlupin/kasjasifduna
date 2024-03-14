const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Certifique-se de que o caminho está correto

const app = express();
app.use(express.json()); // Para parsear o corpo das requisições em JSON

// Substitua 'sua_string_de_conexao_mongodb' pela sua string de conexão do MongoDB
mongoose.connect('mongodb+srv://arsenerlupinn:Morcego1!@cluster0.q3tr0xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Não foi possível conectar ao MongoDB Atlas', err));

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Rota de cadastro de usuários
app.post('/cadastro', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const novoUsuario = new User({ email, senha });
    await novoUsuario.save();
    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
