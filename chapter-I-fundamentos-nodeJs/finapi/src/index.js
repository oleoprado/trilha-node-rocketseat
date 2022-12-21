const express = require('express');
const { v4: uuidv4 } = require('uuid'); //lib p/ gerar um numero aleatorio e usar no ID

const app = express();

app.use(express.json()); // middleware

const customers = []; // "banco de dados"

//MIddleware
function verifyIfExistAccountCPF(req, res, next) {
  const { cpf } = req.headers; // passar o cpf pelo header

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) return res.status(400).json({ error: 'Customer not found' });

  req.customer = customer;

  return next();
}

// função operação da conta
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

// criando uma conta
app.post('/account', (req, res) => {
  const { cpf, name } = req.body;

  // verifica se já existe cpf cadastrado
  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  );

  //se existir, retorna uma msg de error
  if (customerAlreadyExists) {
    return res.status(400).json({ error: 'Customer already exist!' });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return res.status(201).send();
});

// buscando transacoes por cpf
app.get('/statement', verifyIfExistAccountCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
})

// fazer deposito
app.post('/deposit', verifyIfExistAccountCPF, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

// fazer saque
app.post('/withdraw', verifyIfExistAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds!' })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

// buscando(filtrando) transacoes por data
app.get('/statement/date', verifyIfExistAccountCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00"); // buscar por dia, independente de horario

  const statement = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

  return res.json(customer.statement);
})

//atualizar dados do cliente
app.put('/account', verifyIfExistAccountCPF, (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).send();
});

// listar a conta
app.get('/account', verifyIfExistAccountCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer);
});

// deletar uma conta
app.delete('/account', verifyIfExistAccountCPF, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1); // remover só a posição do customer(1)

  return res.status(200).json(customers);
});

// mostrar o balanço da conta
app.get('/balance', verifyIfExistAccountCPF, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.json(balance);
})

app.listen(3333);