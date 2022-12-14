import { NextResponse } from "next/dist/server/web/spec-extension/response";
// import { verify } from "jsonwebtoken";

export default function middleware(req) {
  const secret = process.env.SECRET;

  let verifys = req.cookies.get("OursiteJWT");
  let url = req.url;

  // online domain for heroku
  // const domain = "https://.herokuapp.com/";

  // offline domain for localhost
  const domain = "http://localhost:3000/";

  if (!verifys && url.split("/")[3] == "user") {
    return NextResponse.redirect(`${domain}login`);
  }
  if (!verifys && url.split("/")[3] == "admin") {
    return NextResponse.redirect(`${domain}login`);
  }
}
