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
    takeaway: 'Layered REST API, authentication, MySQL design',
    summary:
      'A full-stack web application I designed and built to run a Yu-Gi-Oh! progression league, backed by a layered REST API and a MySQL database. Authentication, card search, and deck management are implemented; player, match, and league-progression tracking are in development.',
    highlights: [
      '**Designed a layered REST API** in Node.js and Express, with middleware, controllers, services, and repositories each owning a single responsibility.',
      '**Implemented secure authentication** with Argon2 password hashing, persistent sessions, and middleware-protected routes.',
      '**Designed the MySQL schema** around users, sessions, and decks, with explicit relationships the league features build on.',
      '**Built a typed React frontend** in TypeScript that consumes the API through typed request and response shapes.',
      '**Integrated an external card API** to power trading-card search.',
      '**Implemented deck management:** creating, editing, and importing decks.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'REST APIs', 'Argon2', 'AWS Lightsail'],
    links: {},
    visual: 'duelist',
    // Add real screenshots once you have them. Put the files in
    // /public/projects/duelist-kingdom/ and list them here, e.g.:
    // screenshots: [
    //   {
    //     src: '/projects/duelist-kingdom/deck-builder.png',
    //     alt: 'Deck builder showing card search results beside a deck list',
    //     caption: 'Deck builder',
    //     width: 1600,
    //     height: 1000,
    //   },
    // ],
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
            detail: 'Sessions · auth',
            role: 'Runs before route handlers: checks the session on protected routes and handles cross-cutting concerns.',
          },
          {
            name: 'Controllers',
            detail: 'HTTP boundary',
            role: 'Turn HTTP requests into service calls and shape the JSON response. No SQL here.',
          },
          {
            name: 'Services',
            detail: 'Application logic',
            role: 'Own the rules for accounts, decks, and imports, and coordinate calls to the external card API.',
          },
          {
            name: 'Repositories',
            detail: 'Data access',
            role: 'Encapsulate queries against MySQL so the rest of the app never writes SQL directly.',
          },
          {
            name: 'MySQL',
            detail: 'Relational store',
            role: 'Holds users, sessions, decks, and league data with explicit relationships between them.',
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
            title: 'Protected routes',
            body: 'Middleware checks the session before a request reaches any controller that needs a signed-in user.',
          },
        ],
      },
      data: {
        intro:
          'I designed the schema around a few core entities. The account and deck entities are in use today; the league entities are being added as those features come together.',
        entities: [
          { name: 'Users', body: 'Accounts with hashed credentials. Each user owns their decks.', status: 'completed' },
          { name: 'Sessions', body: 'Persistent sign-in state tied to a user.', status: 'completed' },
          { name: 'Decks', body: 'Named card lists a user creates, edits, or imports.', status: 'completed' },
          { name: 'Cards', body: 'Card data found through the external card API and referenced from decks.', status: 'completed' },
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
          'Card search via external API',
          'Deck creation, management, and import',
        ],
        inProgress: ['Player tracking', 'Match recording', 'League standings and progression'],
      },
    },
  },
  {
    slug: 'mapreduce',
    title: 'Distributed MapReduce',
    category: 'Distributed systems',
    status: 'completed',
    takeaway: 'Task scheduling, concurrency, distributed processing',
    summary:
      'A distributed MapReduce system I implemented in Go, with a coordinator that schedules map and reduce tasks across a pool of concurrent worker processes.',
    highlights: [
      '**Built the coordinator** that splits each job into map tasks and schedules reduce tasks once intermediate data is ready.',
      '**Implemented worker processes** that execute map and reduce tasks in parallel over grouped keys.',
      '**Tracked task state across concurrent workers** to coordinate the map and reduce phases of every job.',
    ],
    stack: ['Go', 'Concurrency', 'Distributed systems'],
    links: {},
    visual: 'mapreduce',
  },
  {
    slug: 'android-fighting-game',
    title: 'Battleframe',
    category: 'Native Android turn-based fighting game',
    status: 'completed',
    takeaway: 'Custom rendering, OOP architecture, Android',
    summary:
      'A native Android fighting game I built in Java, with a custom animation engine, turn-based combat, character progression, and data-driven game content. I designed its rendering system and object-oriented architecture, separating combat mechanics, characters, abilities, and progression.',
    highlights: [
      '**Built a custom render loop** on a SurfaceView running on its own thread, driving idle, attack, special, and hurt animation states.',
      '**Made game content data-driven:** abilities, items, and opponents load from JSON with Gson, with caching.',
      '**Designed an object-oriented game model** for characters, stats, abilities, items, and battles.',
      '**Implemented the full game flow** across activities: character creation, turn-based battles, leveling up, and a shop.',
    ],
    stack: ['Java', 'Android', 'Android Studio', 'Gson'],
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
  },
  {
    slug: 'radiowave',
    title: 'RadioWave',
    category: 'Full-stack web application',
    status: 'completed',
    takeaway: 'Express backend, MongoDB, server-rendered views',
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
  },
  {
    slug: 'nasa-robotics',
    title: 'NASA Robotics Competition',
    category: 'Robotics · Team project',
    status: 'completed',
    takeaway: 'Autonomous robotics, ROS, simulation',
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
