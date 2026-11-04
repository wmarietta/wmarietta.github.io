import type { Project } from './types'

/**
 * Projects, in display order. The first project with a `caseStudy` is shown
 * as the featured project; the rest render as cards. To add a project, append
 * an object here. Only add `links` that actually exist.
 */
export const projects: Project[] = [
  {
    slug: 'duelist-kingdom',
    title: 'Duelist Kingdom',
    category: 'Full-stack web application',
    status: 'in-development',
    cardSummary:
      'A trading card game league platform with a layered Node.js/Express API, Argon2 session authentication, and a relational MySQL schema.',
    summary:
      'A full-stack trading card game management platform I designed and built to run a Yu-Gi-Oh! progression league, backed by a layered REST API and a relational MySQL database. Authentication, card search, and the deck-management APIs are implemented; the deck-management interface and player, match, and league-progression tracking are in development.',
    highlights: [
      '**Architected a full-stack application** with a React/TypeScript frontend and a layered Node.js/Express REST API, separating request handling, business logic, and data access to improve maintainability and extensibility.',
      '**Designed a relational MySQL database** for a trading card game management platform, implementing deck-management APIs, YDK deck imports, and cached external card searches to reduce redundant requests.',
      '**Implemented secure authentication** using Argon2 password hashing, persistent sessions, and server-side session and ownership checks that restrict deck changes to their owners.',
      '**Built a typed React frontend** in TypeScript that consumes the API through typed request and response shapes.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'REST APIs', 'Argon2', 'AWS Lightsail'],
    links: {},
    visual: 'duelist',
    diagram: 'request-lifecycle',
    screenshots: [
      {
        src: '/projects/duelist-kingdom/home.jpg',
        alt: 'Duelist Kingdom home page: the crown-and-cards logo, a short description of progression seasons, and Search Cards and Sign In buttons.',
        caption: 'Home page',
        width: 1440,
        height: 900,
      },
      {
        src: '/projects/duelist-kingdom/sign-in.jpg',
        alt: 'Duelist Kingdom sign-in form with username and password fields and a link to create an account.',
        caption: 'Sign-in screen',
        width: 1440,
        height: 900,
      },
    ],
    screenshotsNeeded: [
      {
        caption: 'Card search with results',
        file: '/projects/duelist-kingdom/card-search.jpg',
        note: 'Results need the API server and MySQL running.',
      },
      { caption: 'Profile page, signed in', file: '/projects/duelist-kingdom/profile.jpg' },
    ],
    caseStudy: {
      overview:
        'A progression league needs a shared record of who is playing, what they’re playing, and how the season is going. I built Duelist Kingdom to be that record, and I architected it as a real application rather than a single-file prototype: a typed frontend, a layered REST API, and a relational database.',
      architecture: {
        intro:
          'Every request follows the same path through the backend. I kept each layer narrow so routing, business logic, and SQL never get tangled together, and each piece can be reasoned about and changed on its own.',
        layers: [
          {
            name: 'Client',
            detail: 'React · TypeScript',
            role: 'Renders the interface and calls the REST API with typed request and response shapes.',
          },
          {
            name: 'Middleware',
            detail: 'Sessions · errors',
            role: 'Loads the session on every request and turns application errors into consistent JSON responses.',
          },
          {
            name: 'Routes',
            detail: 'auth · cards · decks',
            role: 'Map each endpoint to its controller, grouped by resource.',
          },
          {
            name: 'Controllers',
            detail: 'HTTP boundary',
            role: 'Turn HTTP requests into service calls and shape the JSON response. No SQL here.',
          },
          {
            name: 'Services',
            detail: 'Application logic',
            role: 'Own the rules for accounts, decks, and imports, including deck ownership checks, and coordinate calls to the external card API.',
          },
          {
            name: 'Repositories',
            detail: 'Data access',
            role: 'Encapsulate queries against MySQL so the rest of the app never writes SQL directly.',
          },
          {
            name: 'MySQL',
            detail: 'Relational store',
            role: 'Holds users, decks, cards, and league data with explicit relationships between them.',
          },
        ],
      },
      auth: {
        intro: 'I built authentication first, because everything else in the league depends on knowing who a user is.',
        steps: [
          {
            title: 'Register',
            body: 'Passwords are hashed with Argon2, a memory-hard algorithm designed to resist brute-force attacks, before anything is stored.',
          },
          {
            title: 'Sign in',
            body: 'Credentials are verified against the stored hash, and a persistent session is created for the user.',
          },
          {
            title: 'Stay signed in',
            body: 'The session survives page reloads and return visits, so users don’t re-authenticate on every request.',
          },
          {
            title: 'Ownership checks',
            body: 'Deck changes run only for the signed-in user who owns the deck. The service rejects anyone else before the database is touched.',
          },
        ],
      },
      data: {
        intro:
          'I designed the schema around a few core entities. The account and deck entities are in use today; the league entities are being added as those features come together.',
        entities: [
          { name: 'Users', body: 'Accounts with hashed credentials. Each user owns their decks.', status: 'completed' },
          { name: 'Decks', body: 'Named card lists a user creates, renames, deletes, or imports from YDK files.', status: 'completed' },
          { name: 'Deck cards', body: 'Each deck’s cards by deck section, with quantities enforced by check constraints.', status: 'completed' },
          { name: 'Cards', body: 'Card data cached from the external card API and referenced from decks.', status: 'completed' },
          { name: 'Players & matches', body: 'League participants and recorded match results.', status: 'in-development' },
          { name: 'League progression', body: 'Standings and progression across a league season.', status: 'in-development' },
        ],
      },
      progress: {
        built: [
          'React + TypeScript frontend',
          'Express REST API with layered architecture',
          'Registration, login, and persistent sessions',
          'Argon2 password hashing',
          'Card search with cached external API results',
          'Deck-management and YDK import APIs',
        ],
        inProgress: ['Deck-management interface', 'Player tracking', 'Match recording', 'League standings and progression'],
      },
    },
  },
  {
    slug: 'mapreduce',
    title: 'Distributed MapReduce',
    category: 'Distributed systems',
    status: 'completed',
    cardSummary:
      'A Go framework that runs map and reduce tasks on concurrent worker processes and enforces the dependency between the two phases.',
    summary:
      'A distributed MapReduce framework I implemented in Go, with a coordinator that schedules map and reduce tasks across a pool of concurrent worker processes.',
    highlights: [
      '**Developed a distributed MapReduce framework in Go**, coordinating concurrent worker processes that execute map and reduce tasks in parallel over grouped keys.',
      '**Implemented task scheduling and state tracking** to enforce dependencies between map and reduce phases, scheduling reduce tasks only once intermediate data is ready.',
    ],
    stack: ['Go', 'Concurrency', 'Distributed systems'],
    links: {},
    visual: 'mapreduce',
    diagram: 'mapreduce',
  },
  {
    slug: 'android-fighting-game',
    title: 'Battleframe',
    category: 'Native Android turn-based fighting game',
    status: 'completed',
    cardSummary:
      'A native Android fighting game with a custom render loop on its own thread, an extensible combat system, and JSON-driven content.',
    summary:
      'A native Android fighting game I built in Java, with a custom animation engine, turn-based combat, character progression, and data-driven game content. I designed its rendering system and object-oriented architecture, separating combat mechanics, characters, abilities, and progression.',
    highlights: [
      '**Engineered a custom 2D animation system** on Android’s SurfaceView with a dedicated render thread that keeps the UI responsive.',
      '**Built a reusable update/draw interface** shared by characters and projectiles, so every on-screen object runs through the same render loop; characters animate through idle, attack, special, and hurt states.',
      '**Designed an extensible turn-based combat system** with reusable interfaces for abilities and items, JSON-driven game content, and integrated character progression.',
      '**Made game content data-driven:** abilities, items, and opponents load from JSON with Gson, with in-memory caching.',
      '**Implemented the full game flow** across activities: character creation, turn-based battles, leveling up, and a shop.',
    ],
    stack: ['Java', 'Android SDK', 'Android Studio', 'Gson'],
    links: { repo: 'https://github.com/wmarietta/AndroidFightingGame' },
    evidence: [
      {
        label: 'BattleView.java',
        href: 'https://github.com/wmarietta/AndroidFightingGame/blob/main/app/src/main/java/project3/wmariett/animation/BattleView.java',
      },
      {
        label: 'DataManager.java',
        href: 'https://github.com/wmarietta/AndroidFightingGame/blob/main/app/src/main/java/project3/wmariett/util/DataManager.java',
      },
      {
        label: 'JSON game data',
        href: 'https://github.com/wmarietta/AndroidFightingGame/tree/main/app/src/main/assets/json',
      },
    ],
    visual: 'fighter',
    diagram: 'battleframe',
    screenshotsNeeded: [
      {
        caption: 'Battle screen mid-turn',
        file: '/projects/battleframe/battle.jpg',
        note: 'Gameplay uses Dragon Ball character sprites. Decide whether to publish them before adding.',
      },
      { caption: 'Character creation', file: '/projects/battleframe/character-creation.jpg' },
      { caption: 'Level-up screen', file: '/projects/battleframe/level-up.jpg' },
    ],
  },
  {
    slug: 'radiowave',
    title: 'RadioWave',
    category: 'Full-stack web application',
    status: 'completed',
    cardSummary:
      'An Express and MongoDB app for running an internet radio station, with a dedicated module for each station role.',
    summary:
      'An internet radio station management app I built with Node.js, Express, and MongoDB for organizing songs, playlists, and broadcast time slots, with a dedicated module for each station role: DJ, producer, and host.',
    highlights: [
      '**Structured an Express 5 backend** with separate route modules for login and the manager dashboard.',
      '**Built a client-side module for each station role** on top of server-rendered EJS views with shared layouts.',
      '**Modeled the MongoDB data layer** with Mongoose schemas for users, songs, playlists, and time slots.',
      '**Persisted session state in MongoDB** with express-session and connect-mongo, so a user’s selected time slot carries across requests.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'EJS'],
    links: { repo: 'https://github.com/wmarietta/RadioWave' },
    evidence: [
      { label: 'server.js', href: 'https://github.com/wmarietta/RadioWave/blob/main/server.js' },
      { label: 'Mongoose models', href: 'https://github.com/wmarietta/RadioWave/tree/main/models' },
      { label: 'Routes', href: 'https://github.com/wmarietta/RadioWave/tree/main/routes' },
    ],
    visual: 'radio',
    screenshotsNeeded: [
      { caption: 'Login page', file: '/projects/radiowave/login.jpg' },
      { caption: 'Manager dashboard', file: '/projects/radiowave/manager.jpg' },
    ],
  },
  {
    slug: 'nasa-robotics',
    title: 'NASA Robotics Competition',
    category: 'Robotics · Team project',
    status: 'completed',
    cardSummary:
      'Autonomous task behavior for NASA’s Valkyrie humanoid robot in Python and ROS, tested in Gazebo, as part of a competition team.',
    summary:
      'On a team with experienced software professionals, I programmed autonomous task behavior for NASA’s R5 Valkyrie humanoid robot in Python and ROS, testing it in Gazebo simulation.',
    highlights: [
      '**Programmed autonomous task behavior** for the Valkyrie humanoid in Python with ROS.',
      '**Tested and refined behavior in simulation** using a Gazebo environment.',
      '**Collaborated with experienced software professionals** as part of the competition team.',
    ],
    stack: ['Python', 'ROS', 'Gazebo'],
    links: {},
    visual: 'robotics',
    screenshotsNeeded: [
      {
        caption: 'Valkyrie in the Gazebo simulation',
        file: '/projects/nasa-robotics/gazebo.jpg',
        note: 'Optional. Only if you have a capture you’re allowed to share.',
      },
    ],
  },
]

/** Smaller projects listed compactly beneath the main cards. */
export const otherProjects: { title: string; description: string; stack: string[] }[] = [
  {
    title: 'Earthquake Search',
    description: 'A native Android app I built for searching earthquakes, with an interactive map for exploring the results.',
    stack: ['Android', 'Maps'],
  },
]
