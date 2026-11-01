# Catálogo de Produtos

## Execução

Com o Node.js instalado, execute na pasta do projeto:

```bash
npm install
npm run dev
```

Abra o endereço indicado no terminal.

## API

Configure o endereço da API no arquivo `.env` e reinicie o projeto:

```env
VITE_API_URL=https://atividade-pratica-1.onrender.com
```

A API da atividade anterior já está configurada. As consultas usadas são `GET /produtos` e `GET /produtos/:id`. Nessa API, o nome do produto fica no campo `descricao`, que é usado na pesquisa e nos cartões. O Vite encaminha `/api` para o endereço configurado no `.env`, permitindo executar o catálogo sem o bloqueio de CORS do servidor. Para hospedar o front-end separadamente, será necessário configurar esse encaminhamento na hospedagem ou liberar CORS na API.

## Componentes

```text
App
├── Header
├── ProductSearch
├── ProductList
│   └── ProductCard
└── ProductDetails
```

## Fluxo de dados

App guarda a lista, o texto da pesquisa e o produto selecionado com useState.  
ProductSearch recebe o texto e chama a função de App quando o usuário digita.  
App filtra os produtos pelo nome e atualiza o contador junto com a lista.  
ProductList recebe a lista e cria os cartões usando map e o id como key.  
ProductCard recebe um produto e envia seu id ao clicar em Ver detalhes.  
App usa useEffect e fetch para consultar a lista e os detalhes na API.  
ProductDetails recebe o resultado por props e o botão de fechar oculta o painel.
