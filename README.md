<p align="center">
<a  href="https://www.heroku.com/"><img  src="https://static-00.iconduck.com/assets.00/heroku-icon-2048x2048-4rs1dp6p.png"  alt="Heroku"  width="150" height="150" hspace="50"/></a>
<a href="https://expressjs.com/"><img  src="https://www.rapidbrains.com/assets/img/services/rapidbrains-expressjs.webp"  alt="lock_icon"  width="150" height="150" hspace="50"/></a>
<p/>

# Heroku AppLink Express Example

- [Heroku AppLink Express Example](#heroku-applink-express-example)
  - [What does it do?](#what-does-it-do)
  - [How does it work?](#how-does-it-work)
    - [Architecture diagram](#architecture-diagram)
  - [Technologies used](#technologies-used)
- [License](#license)
- [Disclaimer](#disclaimer)

## What does it do?

This project demonstrates how to build a Node.js Express application that integrates with Salesforce using Heroku App Link. It provides a working example of an API that can interact with Salesforce Data Cloud, handle data change events, and perform operations on segments.

## How does it work?

This application serves as a middleware between Salesforce and other systems, providing API endpoints to:

Retrieve and create segments in Salesforce Data Cloud
Handle Data Cloud data change events
Provide health check and testing endpoints
The application uses the Heroku service mesh middleware to authenticate and interact with Salesforce APIs.

```
/
├── server/
│   ├── src/
│   │   ├── controllers/     # API endpoint logic
│   │   ├── middleware/      # Heroku Service Mesh middleware
│   │   ├── routes/          # Route definitions
│   │   └── utils/           # Helper utilities
│   ├── index.js             # Express app entry point
│   └── package.json         # Server dependencies
├── api-spec.yaml            # OpenAPI specification
├── Procfile                  # Heroku deployment configuration
├── package.json             # Root package.json for Heroku
└── README.md                # This file
```

### Architecture diagram

## Technologies used

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Heroku](https://www.heroku.com/)
- [Heroku AppLink](https://devcenter.heroku.com/articles/getting-started-heroku-integration?singlepage=true)

For a more detailed overview of the development & production dependencies, please check [`package.json`](./server/package.json).

# License

[MIT](http://www.opensource.org/licenses/mit-license.html)

# Disclaimer

This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Salesforce bears no responsibility to support the use or implementation of this software.
