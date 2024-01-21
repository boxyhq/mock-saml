const getEntityId = (entityId: string, namespace: string | undefined) => {
  return namespace ? `${entityId}/${namespace}` : entityId;
};

const getSSOUrl = (appUrl: string, namespace: string | undefined) => {
  return `${appUrl}/api` + (namespace ? `/namespace/${namespace}` : '') + '/saml/sso';
};

export { getEntityId, getSSOUrl };
