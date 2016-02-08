## WatchDog

This is a simple little app that monitors your systems vitals and displays a running history. Alerts will display in the dashboard when the load average exceeds your CPU threshold and when they return to a normal level.

### Installation

### Production Environment

```
NODE_ENV=production npm install && npm run build
```

These commands will install the necessary dependencies, build the application and install it to the public folder.

To start the application you could just run `NODE_ENV=production node server/build/index.js`. If you'd like it to run continuously consider using a tool like forever.

### Dev environment

Make sure the node modules are installed with the dev dependencies. `npm install`

Server: (listens on port 3000)
```
npm run server
```

Frontend: (listens on port 3001)
```
npm run start
```

### Stress Test

This application includes a stress test script to test the functionality of the message center. The test will run an infinite loop on each core for a predefined amount of time. This will raise the load average of the system above the threshold and cause the server to send an alert.

To manually trigger the stress test run `server/src/load.sh`. The test will complete after 12 times the number of cores (physical and logical) on your system in seconds.

If you'd like to run the test for a set amount of time then call the script with the first argument as the number of seconds. `server/src/load.sh 40` will run the script for 40 seconds.

### Test

There is decent test converage for the functionality. To run the suite make sure the dev dependencies are installed.

Run with:

```
npm run test
```

The tests include the stress test as well, but it is fully automated to start and stop once the thresholds trigger.
