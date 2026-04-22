import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id && i.variant === (action.payload.variant ?? null))
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && i.variant === (action.payload.variant ?? null)
              ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }],
      }
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity, variant } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => !(i.id === id && (i.variant ?? null) === (variant ?? null))) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id && (i.variant ?? null) === (variant ?? null) ? { ...i, quantity } : i
        ),
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && (i.variant ?? null) === (action.payload.variant ?? null))
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

const initialState = { items: [] }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product, quantity = 1, variant = null) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        quantity,
        variant,
      },
    })
  }

  const updateQuantity = (id, quantity, variant = null) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, variant } })
  }

  const removeFromCart = (id, variant = null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, variant } })
  }

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const cartCount = state.items.reduce((acc, i) => acc + i.quantity, 0)
  const cartTotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
