import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  generateRandomQuantity,
  generateRandomSerialNum,
} from "./product-helper-functions";

const initialState = {
  products: [],
  loading: true,
  cartItems: [],
  productsSearch: "",
  adminSearch: "",
  currentProduct: {},
  errorMsg: "",
  categoryFilter: "all",
  sortOrder: "default",
  categories: [],
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://fakestoreapi.com/products/"); // adjust endpoint
  const data = await response.json();

  return data.map((product, index) => ({
    ...product,
    serialNum: generateRandomSerialNum(index % 20), // wrap around if more than 20
    quantity: generateRandomQuantity(),
  }));
});

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const { data } = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initProducts: (state) => {
      state.products.forEach((product, idx) => {
        product["serialNum"] = generateRandomSerialNum(idx);
        product["quantity"] = Math.floor(Math.random() * 21);
      });
    },
    removeStock: (state, action) => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i].serialNum === action.payload[0])
          state.products[i].quantity -= action.payload[1];
      }
    },
    addItemToCart: (state, action) => {
      let serials = state.cartItems.map((item) => {
        return item[0].serialNum;
      });

      if (state.cartItems.length === 0) {
        state.cartItems.push(action.payload);
      } else {
        if (serials.includes(action.payload[0].serialNum)) {
          state.cartItems.forEach((item) => {
            if (item[0]["serialNum"] === action.payload[0].serialNum) {
              item[1] += action.payload[1];
            }
          });
        } else {
          state.cartItems.push(action.payload);
        }
      }
    },
    setProductSearch: (state, action) => {
      state.productsSearch = action.payload;
    },
    setAdminSearch: (state, action) => {
      state.adminSearch = action.payload;
    },
    setCurrentProduct: (state, action) => {
      if (action.payload === "") {
        state.currentProduct = {};
      } else {
        const current = state.products.filter(
          (product) => product.serialNum === action.payload
        );
        state.currentProduct = current[0];
      }
    },
    removeSpecificItem: (state, action) => {
      state.products.forEach((item) => {
        if (item.serialNum === action.payload[0]) {
          item.quantity += action.payload[1];
        }
      });
      state.cartItems = state.cartItems.filter(
        (item) => item[0].serialNum !== action.payload[0]
      );
    },
    changeQuantity: (state, action) => {
      state.products.forEach((item) => {
        if (item.serialNum === action.payload.serialNum) {
          if (action.payload.oldValue > action.payload.newValue) {
            item.quantity += action.payload.oldValue - action.payload.newValue;
          } else {
            item.quantity -= action.payload.newValue - action.payload.oldValue;
          }
        }
      });

      state.cartItems.forEach((item) => {
        if (item[0].serialNum === action.payload.serialNum) {
          item[1] = action.payload.newValue;
        }
      });
    },
    updateQuantityAfterOrder: (state, action) => {
      state.products.forEach((item) => {
        if (item.serialNum === action.payload.serialNum) {
          item.quantity = action.payload.newValue;
        }
      });
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateItemFromAdmin: (state, action) => {
      state.products.forEach((item) => {
        if (item.serialNum === action.payload.serialNum) {
          item.quantity = action.payload.quantity;
          item.price = action.payload.price;
          item.description = action.payload.desc;
          item.title = action.payload.title;
          item.image = action.payload.image;
          item.category = action.payload.category;
        }
      });
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (product) => product.serialNum !== action.payload
      );
    },
    addNewItem: (state, action) => {
      let maxID = 0;
      state.products.unshift(action.payload);

      state.products.forEach((item) => {
        if (item.id > maxID) {
          maxID = item.id;
        }
      });

      state.products.forEach((item) => {
        if (item.serialNum === action.payload.serialNum) {
          item.id = maxID + 1;
        }
      });
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.errorMsg = "Failed to retrieve products";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.errorMsg = "Failed to retrieve categories";
      });
  },
});

export const {
  removeStock,
  initProducts,
  addItemToCart,
  setProductSearch,
  setAdminSearch,
  setCurrentProduct,
  removeSpecificItem,
  changeQuantity,
  clearCart,
  updateQuantityAfterOrder,
  updateItemFromAdmin,
  deleteItem,
  addNewItem,
  setCategoryFilter,
  setSortOrder,
  setCategories,
} = productSlice.actions;

export default productSlice.reducer;
