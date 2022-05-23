## Thank you for the good test.

## How to run

NodeJs and npm or yarn should be installed on your PC.

Move to the project folder and run:

```
npm install
```

I integrated nodemon for livereloading on the development.

Run the project on development mode:

```
npm run start
```

Open `http://localhost:8080/graphql` on your browser for the playground interface.

You can run the unit test to validate all the requests types:
(Unit tests are done with `Jest`)
```
npm test
```

To build a production version you can run:

```
npm run build
```

You will find it on the `build` folder.

I integrated a Eslint and prettier to the project, so you can use them to organize your code and finx syntax errors:

Verify the syntax:

```
npm run lint:fix
```

## Project structure



I added the services that I need to load into separated loaders to be able to load other services later without the need to maybe interact with the code of my old services also with this structure you can add some Rest API endpoints later if needed without making any deep changes.

I choosed to put 3 layers on this project which are:

- Resolvers layers: It's the first layer communicating with the HTTP requests, it's like the controllers layer for the Rest API.

- Services layers: This layer is an intermediate layer between the resolvers layer and our data layers used mostly to pass the data between
 those two and maybe for some other actions like executing a job after getting the good data from the data model layer.

 - Data models layer: It's the layer used to interact with the database mostly and do some logic things.

 I integrated also winston logger that can be used the way you want in the development process or to log errors for example into a file in prod mode.

 Ps: we can still separate the logic things into another lower layer. `Helpers` layer for example.

 So it's a well organised structure that can be implimented on even big projects without running into any problem.