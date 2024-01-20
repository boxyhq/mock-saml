const getEntityId = (entityId: string, org: string | undefined) => {
  return org ? `${entityId}/${org}` : entityId;
};

export { getEntityId };
