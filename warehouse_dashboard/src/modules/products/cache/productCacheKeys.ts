export const productCacheKeys = {
    all: () => ['/products/show'],
    byId: (id: number) => ['/product/get/', id.toString()],
    byWarehouse: (id: number) => ['/products/show/warehouses/', id.toString()],
};