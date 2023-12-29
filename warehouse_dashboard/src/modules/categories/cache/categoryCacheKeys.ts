export const categoryCacheKeys = {
    all: () => ['/categories/show'],
    byId: (id: number) => ['/categories/get/', id.toString()],
  };