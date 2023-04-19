//! this is just a template auth file, and may need to be altered
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//* Importing the apollo server
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema')

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '../client/build')));
}

app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(dirname, '../client/build/index.html'));
});

//* Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port" ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  //* Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
