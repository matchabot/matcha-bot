# MatchaBot

## Introduction

**MatchaBot** is a code generator. You can use **matchabot** to create an entire project, or to generate code inside an existing project in a consistent way.

![MatchaBot](https://raw.githubusercontent.com/matchabot/matcha-bot/main/packages/matcha-bot-cli/doc/matchabot.gif)

### Features

- ✅ Easy to use **in project** generator
- ✅ [HandleBars](https://handlebarsjs.com/) support
- ✅ Powerfull command line support

### Benefits

- ✅ Simple
- ✅ Boost your productivty
- ✅ Fun to use 🦄

### Key concepts

- 👉 A **code generator** is identified by a **command**.
- 👉 A **command** takes a list of **arguments** as input and execute a list of **generator actions** ⚙️.
- 👉 ️️A **generator action** is specified by one or multiple **templates** written with a templating language such as [HandleBars](https://handlebarsjs.com/) or [EJS](https://ejs.co/)
- 👉 The generators definitions are stored inside your project inside the **`./.machatbot`** directory
- 👉 Each **command** is defined by a **`matcha.json`** file inside the **`./.machatbot`** directory

### How to start

**Add matchabot to your project**

Execute the following command at the root of your project.

```bash
yarn add matchabot --dev
```

**Initialise matchabot**

Execute the following command at the root of your project.

```bash
matchabot init
```

👉 This command create a local directory **`./.matchabot`** inside your project

```bash
./.matchabot
└── commands
    ├── add-command
    ├── add-licence
```

The **command** directory contains a list of subdirectory. Each subdirectory contains a **matcha.json** file that defines the **command** and a list of asociated **templates**.

Example **`./.matchabot/add-licence/matcha.json`**:

```json
{
  "name": "add-licence",
  "description": "add a licence file to your project",
  "version": "1.0.0",
  "args": [
    {
      "name": "CopyRightsHolder",
      "alias": "c",
      "type": "string",
      "default": "{{process.env.LOGNAME}}"
    },
    {
      "name": "ProgramDescription",
      "alias": "p",
      "type": "string"
    },
    {
      "name": "LicenceType",

      "type": "list",
      "choices": [
        { "name": "MIT License", "value": "mit" },
        { "name": "BSD License", "value": "bsd" },
        { "name": "Apache License, Version 2.0", "value": "apache2" },
        { "name": "GNU General Public License version 3", "value": "gnu3" }
      ],
      "default": "MIT"
    }
  ],
  "actions": [
    {
      "type": "template",
      "name": "Generate Licence",
      "source": "{{toLowerCase LicenceType}}.md.hbs",
      "target": "LICENCE.md"
    }
  ]
}
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
