import React, { createContext, useState } from "react";

type HoldChordContextType = {
  holdChord: boolean;
  setHoldChord: (chord: boolean | null) => void;
};
const HoldChordContext = createContext<HoldChordContextType | undefined>(
  undefined
);

export const HoldChordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [holdChord, setHoldChord] = useState(true);

  return (
    <HoldChordContext.Provider value={{ holdChord, setHoldChord }}>
      {children}
    </HoldChordContext.Provider>
  );
};
