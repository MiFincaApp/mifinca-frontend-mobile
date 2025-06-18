import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


export type Producto = {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string;
  cantidad: number;
  fincaNombre: string;
};

type CarritoContextType = {
  carrito: Producto[];
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (id: string) => void;
  limpiarCarrito: () => void;
  total: number;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const limpiarCarrito = () => {
    setCarrito([]);
    console.log("🕒 Carrito limpiado por inactividad de 15 minutos.");
  };

  const reiniciarTemporizador = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const nuevoTimeout = setTimeout(limpiarCarrito, 15 * 60 * 1000); // 15 minutos
    setTimeoutId(nuevoTimeout);
  };

  const agregarProducto = (nuevoProducto: Producto) => {
    setCarrito((prev) => {
      const existente = prev.find(
        (p) => p.id === nuevoProducto.id && p.fincaNombre === nuevoProducto.fincaNombre
      );
      if (existente) {
        return prev.map((p) =>
          p.id === nuevoProducto.id && p.fincaNombre === nuevoProducto.fincaNombre
            ? { ...p, cantidad: p.cantidad + nuevoProducto.cantidad }
            : p
        );
      } else {
        return [...prev, nuevoProducto];
      }
    });
  };

  const eliminarProducto = (id: string) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  useEffect(() => {
    if (carrito.length > 0) reiniciarTemporizador();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        total,
        limpiarCarrito, // <-- agrega esta función aquí
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};