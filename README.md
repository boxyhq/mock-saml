# Mock SAML from BoxyHQ

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
[![Deploy with Vercel](https://vercel.com/button)](<https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fboxyhq%2Fmock-saml&env=APP_URL,ENTITY_ID,PUBLIC_KEY,PRIVATE_KEY,NEXT_PUBLIC_GTM_ID&envDescription=APP_URL%20(Usually%20https%3A%2F%2F%3Cproject-name%3E.vercel.app)%20can%20be%20set%20after%20deployment%20from%20the%20project%20dashboard.%20Set%20to%20''%20if%20not%20applicable.&envLink=https%3A%2F%2Fgithub.com%2Fboxyhq%2Fmock-saml%2Fblob%2Fmain%2F.env.example&project-name=mock-saml>)

Mock SAML is a free SAML 2.0 Identity Provider for testing SAML SSO integrations.

Try [Mock SAML](https://mocksaml.com/), our free hosted service.

## Source code visualizer

[CodeSee codebase visualizer](https://app.codesee.io/maps/public/893e0610-9bfc-11ec-980d-9f320f34189e)

## Install

```
git clone https://github.com/boxyhq/mock-saml.git
```

```
cd mock-saml
```

Install dependencies

```
npm install
```

Update `.env` with your own keys.

```
cp .env.example .env
```

Build the Next.js app.

```
npm run build
```

Run the Mock SAML server.

```
npm run start
```
