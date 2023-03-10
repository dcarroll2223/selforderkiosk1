import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  loading: false,
  error: '',
  categories: [],
  loadingProducts: false,
  errorProducts: '',
  products: [],
  order: {
    totalPrice: 0.0,
    itemsCount: 0,
    taxPrice: 0.0,
    orderType: 'Dine In',
    orderItems: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CATEGORY_LIST_REQUEST':
      return { ...state, loading: true };
    case 'CATEGORY_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case 'CATEGORY_LIST_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'PRODUCT_LIST_REQUEST':
      return { ...state, loadingProducts: true };
    case 'PRODUCT_LIST_SUCCESS':
      return {
        ...state,
        loadingProducts: false,
        products: action.payload,
      };
    case 'PRODUCT_LIST_FAIL':
      return {
        ...state,
        loadingProducts: false,
        errorProducts: action.payload,
      };
    case 'ORDER_SET_TYPE':
      return {
        ...state,
        order: { ...state.order, orderType: action.payload },
      };
    case 'ORDER_ADD_ITEM': {
      const item = action.payload;
      const existItem = state.order.orderItems.find(
        (x) => x.name === item.name
      );
      const orderItems = existItem
        ? state.order.orderItems.map((x) =>
            x.name === existItem.name ? item : x
          )
        : [...state.order.orderItems, item];

      const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
      const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
      const itemsPrice = round2(
        orderItems.reduce((a, c) => a + c.quantity * c.price, 0)
      );
      const taxPrice = round2(0.1 * itemsPrice);
      const totalPrice = itemsPrice + taxPrice;

      return {
        ...state,
        order: {
          ...state.order,
          orderItems,
          taxPrice,
          totalPrice,
          itemsCount,
        },
      };
    }
    case 'ORDER_REMOVE_ITEM': {
      const orderItems = state.order.orderItems.filter(
        (x) => x.name !== action.payload.name
      );

      const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
      const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
      const itemsPrice = round2(
        orderItems.reduce((a, c) => a + c.quantity * c.price, 0)
      );
      const taxPrice = round2(0.1 * itemsPrice);
      const totalPrice = itemsPrice + taxPrice;

      return {
        ...state,
        order: {
          ...state.order,
          orderItems,
          taxPrice,
          totalPrice,
          itemsCount,
        },
      };
    }
    case 'ORDER_CLEAR':
      return {
        ...state,
        order: {
          orderItems: [],
          taxPrice: 0,
          totalPrice: 0,
          itemsCount: 0,
        },
      };

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
