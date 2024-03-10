import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  privateRoutes,
  publicRoutes,
  DEFAULT_LOGOUT_REDIRECT
} from "./routes";

 const { auth } = NextAuth(authConfig);



export default auth( (req) => {
  const { nextUrl } = req
  const isLogged = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  const isAdmin = nextUrl.pathname.startsWith('/Admin')
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if(isPrivateRoute){
    if(!isLogged){
      return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl))
    }
    return 
  }
  if(isAdmin){
    if(!isLogged){
      return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl))
    }else if(req.auth  && req.auth.user.role == 'admin'){
      console.log('not admin')
    }
  }


  return 
})
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};