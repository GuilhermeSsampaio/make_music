import React, { createContext, useContext, useState } from "react";

type ToneContextType = {
  tone: string;
  setTone: (tone: string) => void;
};

const ToneContext = createContext<ToneContextType | undefined>(undefined);

export const ToneProvider = ({ children }: { children: React.ReactNode }) => {
  const [tone, setTone] = useState("C");

  return (
    <ToneContext.Provider value={{ tone, setTone }}>
      {children}
    </ToneContext.Provider>
  );
};

export const useTone = () => {
  const context = useContext(ToneContext);
  if (!context) {
    throw new Error("useTone must be used within a ToneProvider");
  }
  return context;
};
