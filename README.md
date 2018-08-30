###### _POWERED WITH [`@gnarlycode/react-app-tools`](https://github.com/gnarlycode/react-app-tools) && [`@gnarlycode/create-gnarly-app`](https://github.com/gnarlycode/create-gnarly-app)_

# HOW TO RUN

```sh
npm i
npm run build
npm start
```

# MORE COMMANDS

🕹 **`npm run dev`** — dev server (hot reload, watch mode etc)

🕹 **`npm run build`** — build the app

🕹 **`npm run build-static`** — build the app with static html's

🕹 **`npm start`** — serve builded app

# ARCHITECTURE

```
📁 app-name
├─ 📄 📄 📄 ...some configs
│
└─ 📁 src
   ├─ 📁 components
   │  ├─ 📄 App               ℹ️ root component
   │  ├─ 📄 MaterialTable     ℹ️ styled table
   │  ├─ 📄 MoviesTable       ℹ️ displays movies
   │  ├─ 📄 Paginator         ℹ️ paging implementation
   │  │
   │  └─ 📁 components
   │     ├─ 📄 ClientAppRoot  ℹ️ hot reload wrapper
   │     └─ 📄 Html           ℹ️ html doc template
   │
   ├─ 📁 data
   │  ├─ 📄 reducer           ℹ️ root reducer
   │  ├─ 📄 store             ℹ️ redux store creator
   │  └─ 📁 modules
   │     └─ 📄 movies         ℹ️ movies reducer
   │
   ├─ 📁 entries              ℹ️ app entries
   │  ├─ 📄 client
   │  └─ 📄 server
   │
   ├─ 📁 models               ℹ️ typings for states
   │  ├─ 📄 Movie
   │  ├─ 📄 MoviesState
   │  └─ 📄 State
   │
   └─ 📁 utils
      └─ 📄 defaultStyles     ℹ️ base styles
```

# WHAT TO IMPROVE

- The api call is not working from browser for now because cors restrictions.
- Maybe auto tests
