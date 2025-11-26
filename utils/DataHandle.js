export const getObjectById = (id, data) => data.find((p) => p.id === id);

export const filterData = (filters, data) =>
  data.filter(
    (p) =>
      (!filters.genre || p.genres?.includes(filters.genre)) &&
      (!filters.instrument ||
        Object.values(p.instruments).includes(filters.instrument)),
  );
