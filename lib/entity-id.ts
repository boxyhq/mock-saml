const getEntityId = (entityId: string, namespace: string | undefined) => {
  return namespace ? `${entityId}/${namespace}` : entityId;
};

export { getEntityId };
