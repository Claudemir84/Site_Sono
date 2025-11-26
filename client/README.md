# 🥗 Dashboard de Saúde - Full Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> Um sistema completo para monitoramento de hábitos de saúde (Sono, Alimentação e Exercícios), desenvolvido com foco em performance, responsividade e arquitetura limpa.

---

## 📸 Visualização do Projeto

*(Coloque aqui um Print ou GIF do seu projeto rodando. Ex: Uma imagem mostrando o Dashboard no Desktop e outra no Celular lado a lado)*

---

## 🚀 Sobre o Projeto

Este projeto é uma aplicação **Full Stack** que permite ao usuário registrar e monitorar suas atividades diárias. O objetivo foi criar uma interface amigável e moderna que se adapta a qualquer dispositivo, conectada a uma API robusta.

### Principais Funcionalidades:
- **Dashboard Interativo:** Visualização rápida de métricas acumuladas (Total de horas dormidas, calorias e tempo de exercício).
- **CRUD Completo:** Criação, Leitura, Atualização e Exclusão de registros.
- **Filtro Avançado:** Busca de registros por período (Data Inicial e Final).
- **Responsividade Total:** Layout adaptável para Desktop, Tablet e Mobile (com ajustes específicos de UX para cada tela).
- **Persistência de Dados:** Banco de dados SQLite local criado automaticamente.

---

## 🛠 Tecnologias Utilizadas

### Frontend (Client)
- **React + Vite:** Para uma construção rápida e otimizada.
- **CSS Puro (Custom Properties):** Design system próprio com variáveis CSS, Grid e Flexbox (sem frameworks pesados).
- **Axios:** Para consumo da API.

### Backend (Server)
- **Node.js + Express:** Construção da API RESTful.
- **Sequelize (ORM):** Abstração e manipulação do banco de dados.
- **SQLite:** Banco de dados relacional leve e sem configuração complexa.
- **Cors:** Para segurança e permissão de acesso entre rotas.

---

## 📦 Como Rodar o Projeto

Siga os passos abaixo para rodar a aplicação na sua máquina localmente.

### Pré-requisitos
Você precisa ter o **Node.js** instalado em sua máquina.

### 1. Clonar o repositório
```bash
git clone [https://github.com/Claudemir84/Site_Sono.git](https://github.com/Claudemir84/Site_Sono.git)
cd Site_Sono

```

### 2. Configurar e rodar o Backend(API)

Abra um terminal na raiz do projeto e execute:

```bash
cd server
npm install
node server.js
```
O servidor iniciará na porta 3001 e criará o arquivo database.sqlite automaticamente.

### 3. Configurar e rodar o Frontend(Interface)

Abra um segundo terminal (mantenha o anterior aberto) e execute:

```bash
cd client
npm install
npm run dev
```

### Acessar

Abra o navegador e acesse o link fornecido pelo Vite, geralmente: http://localhost:5173

### 📂 Estrutura de Pastas

O projeto segue uma arquitetura separada entre cliente e servidor para melhor organização:

```bash
    /projeto
    │
    ├── /server (Backend)
    │   ├── /src
    │   │   ├── /controllers  # Lógica das regras de negócio
    │   │   ├── /models       # Estrutura do Banco de Dados
    │   │   ├── /routes       # Rotas da API
    │   │   └── /config       # Configuração do SQLite
    │   └── server.js         # Entrada da API
    │
    └── /client (Frontend)
        ├── /src
        │   ├── /services     # Configuração do Axios
        │   ├── App.jsx       # Componente Principal
        │   └── App.css       # Estilização Responsiva
        └── package.json
    
```
Obrigado!!