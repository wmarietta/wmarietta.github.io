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
    takeaway: 'Full-stack architecture, auth, relational data',
    summary:
      'A full-stack web application for running a Yu-Gi-Oh! progression league. Accounts, card search, and deck building work today; player, match, and league-progression tracking are in development.',
    highlights: [
      '**Layered REST API** in Node.js and Express: middleware, controllers, services, and repositories.',
      '**Secure authentication** with Argon2 password hashing and persistent sessions.',
      '**Relational MySQL schema** for users, decks, and league data.',
      '**Typed React frontend** in TypeScript, consuming the API.',
      '**External API integration** for trading-card search.',
      '**Deck builder** with creation, editing, and import.',
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
        'A progression league needs a shared record of who is playing, what they’re playing, and how the season is going. Duelist Kingdom is my attempt to build that as a real application, with a typed frontend, a structured API, and a relational database, rather than a single-file prototype.',
      architecture: {
        intro:
          'Every request follows the same path through the backend. Keeping each layer narrow means routing, business logic, and SQL never get tangled together, and each piece can be reasoned about on its own.',
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
        intro:
          'Authentication came first, because everything else in the league depends on knowing who a user is.',
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
          'The schema is built around a few core entities. Some are in use today; others are being added as the league features come together.',
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
    takeaway: 'Distributed systems and concurrency',
    summary:
      'A MapReduce system in Go that splits a job into tasks and coordinates them across a pool of worker processes.',
    highlights: [
      '**Coordinator** that splits a job into map tasks and schedules reduce tasks once intermediate data is ready.',
      '**Worker processes** that run map and reduce tasks in parallel over grouped keys.',
      '**Task-state tracking** to coordinate many concurrent workers.',
    ],
    stack: ['Go', 'Concurrency', 'Distributed systems'],
    links: {},
    visual: 'mapreduce',
  },
  {
    slug: 'android-fighting-game',
    title: 'Turn-Based Fighting Game',
    category: 'Native Android',
    context: 'School project',
    status: 'completed',
    takeaway: 'OOP, rendering, and mobile development',
    summary:
      'A turn-based fighting game for Android, written in Java, with a hand-built animation system and data-driven game content.',
    highlights: [
      '**Custom render loop** on a SurfaceView running on its own thread, with idle, attack, special, and hurt animation states.',
      '**Data-driven content:** abilities, items, and opponents loaded from JSON with Gson, with caching.',
      '**Object-oriented game model** for characters, stats, abilities, items, and battles.',
      '**Full game flow** across activities: character creation, battles, leveling up, and a shop.',
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
    context: 'Course project · Web App Development',
    status: 'completed',
    takeaway: 'Server-side web app with sessions',
    summary:
      'A business-facing internet radio management app for organizing songs, playlists, and broadcast time slots across DJ, producer, and host roles.',
    highlights: [
      '**Express 5 server** with separate route modules for login and the manager dashboard.',
      '**MongoDB data layer** with Mongoose models for users, songs, playlists, and time slots.',
      '**Session-based auth** with express-session, persisted in MongoDB.',
      '**Server-rendered EJS views** with shared layouts, plus client-side modules for each station role.',
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
    takeaway: 'Robotics, simulation, and teamwork',
    summary:
      'Worked alongside experienced software professionals to program NASA’s R5 Valkyrie humanoid robot to complete autonomous tasks in simulation.',
    highlights: [
      '**Autonomous task behavior** for the Valkyrie humanoid, written in Python with ROS.',
      '**Simulation testing** and iteration in a Gazebo environment.',
      '**Team collaboration** with experienced software professionals.',
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
    description: 'Native Android app for searching earthquakes and exploring the results on an interactive map.',
    stack: ['Android', 'Maps'],
  },
]
