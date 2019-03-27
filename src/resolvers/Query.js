import jwt from 'jsonwebtoken'
import { getUserId } from '../utils'

export default {
  users (parent, args, ctx) {
    return ctx.prisma.users({
      orderBy: args.orderBy
    })
  },

  user (parent, { id }, ctx) {
    return ctx.prisma.user({ id })
  },

  amIAuth (parent, args, ctx,) {
    const Authorization = ctx.request.get('Authorization')
    if (Authorization) {
      try {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, process.env.API_SECRET)
        const me = ctx.prisma.user({ id: userId })
        return { isAuth: true, me }
      } catch (e) {
        return { isAuth: false }
      }
    }
    return { isAuth: false }
  },

  films (parent, args, ctx) {
    return ctx.prisma.films({});
  },
  film (parent, args, ctx) {
    return ctx.prisma.film({
      id: args.idFilm
    })
  },

  series (parent, args, ctx) {
    return ctx.prisma.series({});
  },
  serie (parent, args, ctx) {
    return ctx.prisma.serie({
      id: args.idSerie
    })
  },

  filmsUser (parent, args, ctx) {
    const userId = getUserId(ctx);
    return ctx.prisma.filmUsers({
      where:{user:{id: userId}}
    });
  },
  filmsUsers (parent, args, ctx) {
    return ctx.prisma.filmUsers({
    });
  },
  filmsUserNotFinished(parent, args, ctx) {
    const userId = getUserId(ctx);
    return ctx.prisma.filmUsers({
      where: {
        finish: false,
        user: {
          id: userId
        }
      }
    });
  },
  filmsUserFinished(parent, args, ctx) {
    const userId = getUserId(ctx);
    return ctx.prisma.filmUsers({
      where: {
        finish: true,
        user: {
          id: userId
        }
      }
    });
  },

  seriesUser (parent, args, ctx){
    const userId = getUserId(ctx);
    return ctx.prisma.serieUsers({
      where:{user:{id: userId}}
    });
  },
  seriesUsers (parent, args, ctx){
    return ctx.prisma.serieUsers({
    });
  },

}
