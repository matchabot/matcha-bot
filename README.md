# MatchaBot

## Introduction

🍵 **MatchaBot** is a code generator written in TypeScript.

You can use **matchabot** to **create an entire project**, or to **generate code inside** an existing project in a consistent way.

This tool has been created to offer a "Ruby on Rail" like programming experience with any projects: React / Vue / Angular, NextJS / Gatsby, etc ...

## Features

- ✅ Easy to use **in project** generator
- ✅ You can create your **own generator by project**, or use a **global templates repository**
- ✅ Templating language support: [HandleBars](https://handlebarsjs.com/) and [EJS](https://ejs.co/)
- ✅ Powerfull command line support: automatic **CLI arguments** and **automatic prompts** for missing arguments
- ✅ Simplified workflow to create **new generators** for you **own project**
- ✅ Debug mode
- ✅ **Add new file** to your project
- ✅ **Modify existing files**
- ✅ You can generate **any kind of files/projects** (NodeJS, typescript, Javascript, SQL, C++, C, Go, ...)

## Benefits

- ✅ **Simple** and **Powerfull**
- ✅ **Save time** and **Boost** your **productivty**
- ✅ Enforce a **consistent** project structure
- ✅ **Easier** team onboarding with a **codified** best practices **stored inside** each project
- ✅ Fun to use 🦄

## Key concepts

- 👉 A **code generator** is identified by a **name**
- 👉 A **code generator** offer one or more **commands**
- 👉 A **command** takes a list of **arguments** as input and execute a list of **actions** ⚙️.
- 👉 ️️A **generator action** is specified by one or multiple **template** written with a templating language such as [HandleBars](https://handlebarsjs.com/) or [EJS](https://ejs.co/)
- 👉 The generators definition are stored inside your project inside the **`./_machatbot`** directory as a subdirectory
- 👉 **commands** are defined by a **`matchabot.cmd.json`** file inside the **`./_machatbot/--generator-name--`** directory

## 👉 How to start 

### 1 - Add matchabot to your project

Execute the following command at the root of your project.

```bash
yarn add matchabot --dev
```

or

```bash
npm install matchabot --save-dev
```

💡 matchabot can be installed globally with

```bash
npm install -g matchabot
```


### 2️ - Initialise matchabot

Execute the following command at the root of your project.

```bash
matchabot init
```

👉 This command create a local directory **`./.matchabot`** inside your current project directory

**Content of \_matchabot**

```bash
_matchabot
├── license
│   ├── add
│   │   ├── apache2.md.hbs
│   │   ├── bsd.md.hbs
│   │   ├── gnu3.md.hbs
│   │   ├── matchabot.cmd.json
│   │   └── mit.md.hbs
│   └── matchabot.json
└── react-app
    ├── create-app
    │   ├── matchabot.cmd.json
    │   └── template
    ├── create-component
    │   ├── component.tsx.hbs
    │   ├── matchabot.cmd.json
    │   ├── stories.tsx.hbs
    │   └── style.tsx.hbs
    └── matchabot.json
```

In this example, the `_matchabot` is composed of 2 **generators**

- licence
- react-app

Each **generator** is defined by a `matchabot.json`file

Example for `license`

```json
{
  "name": "license",
  "description": "📃 Add licence to your project",
  "version": "1.0.0"
}
```

Each subdirectory contains a definition of a **command** asociated with a **generator**

For the `react-app`generator we have 2 commands:

- `create-app`
- `create-component`

Each subdirectory contains a **matchabot.cmd.json** file that defines the **commands** and list of **actions** to perform.

Example **`./.matchabot/license/add/matchabot.cmd.json`**:

```json
{
  "name": "add",
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

#### command arguments

In this example, the `args` array contains a list of arguments (variables) that will be used in the templates.

**Example of template [Handlebar syntax](https://handlebarsjs.com/)**

```hbs
MIT License

{{ProgramDescription}}.


Copyright (c) {{formatDate currentDate "YYYY"}} - {{CopyRightsHolder}}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

### command actions

In this example with only have 1 action: select a template from `"source": "{{toLowerCase LicenceType}}.md.hbs"` and generates a file `"target": "LICENCE.md"`


## 3 - List all available generators

```bash
matchabot list
```

👉 This command gives the list of defined generators

```bash
  __  __       _       _             ____        _
 |  \/  | __ _| |_ ___| |__   __ _  | __ )  ___ | |_
 | |\/| |/ _` | __/ __| '_ \ / _` | |  _ \ / _ \| __|
 | |  | | (_| | || (__| | | | (_| | | |_) | (_) | |_
 |_|  |_|\__,_|\__\___|_| |_|\__,_| |____/ \___/ \__|

Version: 0.3.0 🍵

Availables generators
---------------------

┌────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┬────────────────────────────────────────────────────────────────────────────────┐
│ name               │ description                                                                                                            │ version  │ location                                                                       │
├────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────┤
│ generator          │ 🤖 Built-in generator of generators: create your own generator                                                        │ 1.0.0    │ ./_matchabot/generator                                                         │
├────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────┤
│ license            │ 📃 Add licence to your project                                                                                        │ 1.0.0    │ ./_matchabot/license                                                           │
├────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────┤
│ react-app          │ 🚀 react app generator                                                                                                 │ 1.0.0    │ ./_matchabot/react-app                                                         │
└────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┴────────────────────────────────────────────────────────────────────────────────┘

```

### 4 - List available commands for a generator

**Lists all the commands of the generator `react-app`**

```bash
matchabot react-app list
```

**Result**

```bash
  __  __       _       _             ____        _
 |  \/  | __ _| |_ ___| |__   __ _  | __ )  ___ | |_
 | |\/| |/ _` | __/ __| '_ \ / _` | |  _ \ / _ \| __|
 | |  | | (_| | || (__| | | | (_| | | |_) | (_) | |_
 |_|  |_|\__,_|\__\___|_| |_|\__,_| |____/ \___/ \__|

Version: 0.3.0 🍵

Availables command(s) for react-app
-----------------------------------

┌────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┬────────────────────────────────────────────────────────────────────────────────┐
│ name                                   │ description                                                                                                            │ version  │ location                                                                       │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────┤
│ create-app                             │ create a typescript react app                                                                                          │ 1.0.0    │ ./_matchabot/react-app/create-app                                              │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────┤
│ create-component                       │ generate a Styled React Component, and an associated story                                                             │ 1.0.0    │ ./_matchabot/react-app/create-component                                        │
└────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┴────────────────────────────────────────────────────────────────────────────────┘

```

### 5 - Use a generator to scaffold a project

Creation of a React Application using a template generator

```bash
matchabot react-app create-app
```

**Result**

```bash
  __  __       _       _             ____        _
 |  \/  | __ _| |_ ___| |__   __ _  | __ )  ___ | |_
 | |\/| |/ _` | __/ __| '_ \ / _` | |  _ \ / _ \| __|
 | |  | | (_| | || (__| | | | (_| | | |_) | (_) | |_
 |_|  |_|\__,_|\__\___|_| |_|\__,_| |____/ \___/ \__|

Version: 0.3.0 🍵

? ApplicationName MyReactApp

🍵 Generating files ...


👉 Created files
```
