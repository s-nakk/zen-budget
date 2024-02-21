import {auth} from "../auth";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT} from "@/app/routes";

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log({URL: new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)});
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl));
  } else if (nextUrl.pathname == '/') {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }
  return null;
})