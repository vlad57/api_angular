import '@babel/polyfill'
import dotenv from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma-client'
import Query from './resolvers/Query'
import Serie from './resolvers/Serie'
import Saison from './resolvers/Saison'
import Episode from './resolvers/Episode'
import FilmUser from './resolvers/FilmUser'
import SerieUser from './resolvers/SerieUser'
import User from './resolvers/User'
import auth from './resolvers/Mutation/auth'
import user from './resolvers/Mutation/user'
import film from './resolvers/Mutation/film'
import serie from './resolvers/Mutation/serie'

dotenv.config()

const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  //secret: process.env.PRISMA_SECRET
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Serie,
    Saison,
    Episode,
    FilmUser,
    SerieUser,
    User,
    Mutation: {
      ...auth,
      ...user,
      ...film,
      ...serie,
    }
  },
  context: req => ({...req, prisma})
})

server.start(() => console.log('Server is running on http://localhost:4000'))
