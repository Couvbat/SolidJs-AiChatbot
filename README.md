# Projet Ai-ChatBot <!-- omit in toc -->

Auteur : Jules Hemery

## Table des matières <!-- omit in toc -->

- [Introduction](#introduction)
- [Choix de technologie](#choix-de-technologie)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
  - [`npm run dev`](#npm-run-dev)
  - [`npm run build`](#npm-run-build)
- [TODO](#todo)

## Introduction

Ce projet est une application web permettant de communiquer avec un chatbot. L'application est réalisée en SolidJS et utilise l'API de OpenAi ou de MistralAi pour générer les réponses du chatbot.

Ce projet a pour but de me faire découvrir le framework SolidJS ainsi que les API de OpenAi et MistralAi, et de me permettre de comparer les deux AI.

## Choix de technologie

- node.js
- SolidJS
- Vite
- TailwindCSS
- js-cookie

### Backend

Pour l'instant l'appli n'a aucun backend, mais je compte en ajouter un pour pouvoir sauvegarder les données de l'utilisateur et les récupérer sur n'importe quel appareil.

### Frontend

J'ai choisi de réaliser ce projet en utilisant le framework SolidJS avec TailwindCSS afin d'apprendre le framework et de pouvoir le comparer à React.

J'utilise Vite pour le bundling et le développement de l'application.

## Installation

```bash
$ git clone https://github.com/Couvbat/SolidJs-AiChatbot.git
$ cd SolidJs-AiChatbot
$ npm i
```

## Scripts disponibles 

Dans le répertoire du projet, vous pouvez exécuter :

### `npm run dev`

Exécute l'application en mode développement.
Ouvrez [http://localhost:5173](http://localhost:5173) pour la visualiser dans le navigateur.

### `npm run build`

Build l'application pour la production dans le dossier `dist`.
Il bundle correctement Solid en mode production et optimise la compilation pour obtenir les meilleures performances.

Le build est minifié et les noms de fichiers incluent les hashs.

## TODO

- [x] Basic Ui
- [x] Working api calls to OpenAi and Mistral
- [x] Basic chat functionality
- [x] Save Api key in cookies
- [x] Easy switch between models
- [ ] model parameters
- [ ] Saves chat history
- [ ] multiple chat instances
- [ ] class exctraction
- [ ] better ui

Back-end ?
