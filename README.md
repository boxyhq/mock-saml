# Mock SAML from BoxyHQ

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/boxyhq/mock-saml/tree/oneclick-deploy-button)

Mock SAML is a SAML 2.0 IdP for development and testing the SAML SSO integration.

Try [Mock SAML](https://mocksaml.com/)

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
