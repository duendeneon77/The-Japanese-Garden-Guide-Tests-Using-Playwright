# The Japanese Garden Guide — Playwright Tests

> **Português:** documentação abaixo.
>
> **English:** English documentation follows.

---

## Português

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

O Playwright está configurado para executar os testes em Chromium, Firefox e WebKit.

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

---

## English

Automated end-to-end tests for **The Japanese Garden Guide** project, using Playwright.

This project was developed to practice test automation and validate different application features through automated scenarios.

## Technologies

- JavaScript
- Playwright
- Node.js
- React
- Vite
- JSON Server
- Git

## Tests

The tests cover features such as:

- Login and logout
- Species creation, editing and deletion
- Article creation, editing and deletion
- Video creation, editing and deletion
- Project page editing
- History page editing
- Editing of water, toro, bridge and rock sections
- Validation of different usage scenarios
- Cleanup of test data

## Project Structure

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

## How to Run

Clone the repository and install the dependencies:

```bash
npm install
```

Install the Playwright browsers:

```bash
npx playwright install
```

### 1. Start the application

In a terminal:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173/The-Japanese-Garden-Guide-Project/
```

### 2. Start the JSON Server

In another terminal:

```bash
npm run server
```

The server will run at:

```text
http://localhost:3001
```

### 3. Run the tests

In a third terminal:

```bash
npx playwright test
```

Playwright is configured to run the tests on Chromium, Firefox and WebKit.

To run only on Chromium:

```bash
npx playwright test --project=chromium
```

To open the Playwright UI:

```bash
npx playwright test --ui
```

## Report

The project uses the Playwright HTML report.

After running the tests:

```bash
npx playwright show-report
```

## Application

**The Japanese Garden Guide**

https://duendeneon77.github.io/The-Japanese-Garden-Guide-Project/

## Author

**Arthur Henrique Santos de Oliveira**

GitHub: https://github.com/duendeneon77
