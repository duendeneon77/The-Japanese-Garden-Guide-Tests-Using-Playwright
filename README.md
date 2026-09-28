# The Japanese Garden Guide — Playwright Tests

Testes automatizados end-to-end para o projeto **The Japanese Garden Guide**, utilizando Playwright.

O projeto foi desenvolvido para praticar automação de testes e validar diferentes funcionalidades da aplicação através de cenários automatizados.

## Tecnologias

- JavaScript
- Playwright
- Node.js
- React
- Vite
- JSON Server
- Git

## Testes

Os testes cobrem funcionalidades como:

- Login e logout
- Cadastro, edição e exclusão de espécies
- Cadastro, edição e exclusão de artigos
- Cadastro, edição e exclusão de vídeos
- Edição da página do projeto
- Edição da página de histórico
- Edição das sessões de água, toro, pontes e pedras
- Validação de diferentes cenários de uso
- Limpeza dos dados utilizados durante os testes

## Estrutura

```text
├── public/
├── src/
├── tests/
│   ├── api/
│   ├── helpers/
│   ├── *.spec.js
│   └── global-teardown.js
├── db.json
├── playwright.config.js
├── package.json
└── vite.config.js
```

## Como executar

Clone o repositório e instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

### 1. Inicie a aplicação

Em um terminal:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173/The-Japanese-Garden-Guide-Project/
```

### 2. Inicie o JSON Server

Em outro terminal:

```bash
npm run server
```

O servidor será executado em:

```text
http://localhost:3001
```

### 3. Execute os testes

Em um terceiro terminal:

```bash
npx playwright test
```

Por padrão, o Playwright está configurado para executar os testes em Chromium, Firefox e WebKit.

Para executar somente no Chromium:

```bash
npx playwright test --project=chromium
```

Para abrir a interface do Playwright:

```bash
npx playwright test --ui
```

## Relatório

O projeto utiliza o relatório HTML do Playwright.

Depois de executar os testes:

```bash
npx playwright show-report
```

## Aplicação

**The Japanese Garden Guide**

https://duendeneon77.github.io/The-Japanese-Garden-Guide-Project/

## Autor

**Arthur Henrique Santos de Oliveira**

GitHub: https://github.com/duendeneon77
