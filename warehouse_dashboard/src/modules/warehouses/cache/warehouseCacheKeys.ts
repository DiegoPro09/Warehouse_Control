export const warehouseCacheKeys = {
    all: () => ['/warehouses/show'],
    byId: (id: number) => ['/warehouse/get/', id.toString()],
  };