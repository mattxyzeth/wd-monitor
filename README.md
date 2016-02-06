## WatchDog

This is a simple little app that monitors your systems vitals and displays a running history. Alerts will display in the dashboard when the load average exceeds your CPU threshold and when they return to a normal level.

### Installation

### Production Environment

```
NODE_ENV=production npm install && npm run build
```

These commands will install the necessary dependencies, build the application and install it to the public folder.

To start the application run:

```
forever server/index.js
```

### Dev environment

Server: (listens on port 3000)
```
npm run server
```

Frontend: (listens on port 3001)
```
npm run start
```
