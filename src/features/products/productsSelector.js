import { createSelector } from "reselect";

const selectProducts = (state) => state.products.products;
const selectSearch = (state) => state.products.productsSearch;
const selectCategoryFilter = (state) => state.products.categoryFilter;
const selectSortOrder = (state) => state.products.sortOrder;
const selectCurrentProduct = (state) => state.products.currentProduct;

export const getProducts = createSelector(
  [selectProducts, selectSearch, selectSortOrder],
  (products, search, sortOrder) => {
    let filtered = search
      ? products.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      : [...products];

    switch (sortOrder) {
      case "priceLowHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameDesc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }
);

export const getRelatedProducts = createSelector(
  [selectProducts, selectCurrentProduct],
  (products, currentProduct) => {
    if (!currentProduct || !currentProduct.category) {
      return [];
    }

    return products.filter(
      (product) =>
        product.category.name === currentProduct.category.name &&
        product.serialNum !== currentProduct.serialNum
    );
  }
);
