import DecoratedRouter from "../lib/decorated_router";

import signup from "../docs/signup.json";

function defineEndpoints({ mw, ctrlrs }) {
  let router = new DecoratedRouter();
  let setDefaultLocale = mw.defaultLocaleInfo({
    locale: "EN",
    countryCode: "US"
  });

  router.route("*").all(mw.requireContentType(/^application\/json/));

  router
    .docs("signup", signup)
    .route("/signup")
      .post(setDefaultLocale, ctrlrs.Users.create);

  router.route("/token").post(ctrlrs.Users.getToken);

  router
    .route("/unauthenticated")
      .get(router.generateLanding(router)) 

  return router;
}

module.exports = { defineEndpoints };
