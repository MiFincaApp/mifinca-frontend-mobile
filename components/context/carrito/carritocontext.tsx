// context/CarritoContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export type Producto = {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string;
};

type CarritoContextType = {
  carrito: Producto[];
  agregarProducto: (producto: Producto) => void;
  total: number;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const agregarProducto = (producto: Producto) => setCarrito((prev) => [...prev, producto]);
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, total }}>
      {children}
    </CarritoContext.Provider>
  );
};
