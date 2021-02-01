# MatchaBot

## Introduction

> 🍵 **MatchaBot** : a template generator on steroids 🚀

**MatchaBot** is a code generator. You can use **matchabot** to create an entire project, or to generate code inside an existing project in a consistent way.

### Features

- ✅ Easy to use **in project** generator
- ✅ [HandleBars](https://handlebarsjs.com/) support
- ✅ Powerfull command line support

### Benefits

- ✅ Simple
- ✅ Boost your productivty
- ✅ Fun to use 🦄

### Key concepts

👉 A code generator is identified by a **command**.
👉 A **command** takes a list of **arguments** as input and execute a list of **generator actions** ⚙️.
👉 ️️A **generator action** is specified by one or multiple **template** written with a templating language such as [HandleBars](https://handlebarsjs.com/) or [EJS](https://ejs.co/)
👉 The generators definitions are stored inside your project inside the **"./.machatbot"** directory

### How to start

**Add matchabot to your project**

```bash
yarn add matchabot --dev
```

**Initialise matchabot for your project**

```bash
matchabot init
```

👉 This command create a local directory **./.matchabot** inside your project

```bash
./.matchabot
└── commands
    ├── add-command
    ├── add-licence
```

**List availables commands**

```bash
matchabot list
```

👉 This command gives the list of defined commands

```bash
  __  __       _       _             ____        _
 |  \/  | __ _| |_ ___| |__   __ _  | __ )  ___ | |_
 | |\/| |/ _` | __/ __| '_ \ / _` | |  _ \ / _ \| __|
 | |  | | (_| | || (__| | | | (_| | | |_) | (_) | |_
 |_|  |_|\__,_|\__\___|_| |_|\__,_| |____/ \___/ \__|

Version: 0.2.0 🍵

┌─────────┬──────────────────────────┬──────────────────────────────────────────────────────────────┬─────────┬────────────────────────────────────────────────┐
│ (index) │           name           │                         description                          │ version │                    location                    │
├─────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┼─────────┼────────────────────────────────────────────────┤
│    0    │      'add-command'       │       'add a new command to the .matchabot directory'        │ '1.0.0' │      './.matchabot/commands/add-command'       │
│    1    │      'add-licence'       │             'add a licence file to your project'             │ '1.0.0' │      './.matchabot/commands/add-licence'       │
│    2    │    'create-react-app'    │               'create a typescript react app'                │ '1.0.0' │    './.matchabot/commands/create-react-app'    │
│    3    │ 'create-react-component' │ 'generate a Styled React Component, and an associated story' │ '1.0.0' │ './.matchabot/commands/create-react-component' │
└─────────┴──────────────────────────┴──────────────────────────────────────────────────────────────┴─────────┴────────────────────────────────────────────────┘

```

**Execute a command**

```bash
matchabot add-licence
```

**Result:**

![Resut](./doc/01.png)

## Add a new command


