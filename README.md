# Backlog

- Form validation
- UI
- Add timestamp to tables
- Feed 10 users

1. Autogenerate certificate
2. Request validation
3. Add logs to all request

SAML certificate (PEM format)

you need to generate a set of public and private keys and an X.509 certificate that contains the public key. The public keys and certificates must be generated with either the RSA or DSA algorithm and registered with Google.

/apps/<id>

ACS URL
Entity ID

Certificate -> Use same Certificate for all apps

Metadata Properties

- entityID (IdP identity)
- validUntil (Hard coded)
- X509Certificate (Hard coded)
- SingleSignOnService -> Binding

/apps/metadata -> Download
