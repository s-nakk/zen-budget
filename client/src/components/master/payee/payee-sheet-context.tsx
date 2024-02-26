import React, {createContext, ReactNode, useContext, useState} from 'react';

interface PayeeSheetContextType {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

const PayeeSheetContext = createContext<PayeeSheetContextType | undefined>(undefined);

export const usePayeeSheet = () => {
  const context = useContext(PayeeSheetContext);
  if (context === undefined) {
    throw new Error('usePayeeSheet must be used within a PayeeSheetProvider');
  }
  return context;
};

export const PayeeSheetProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <PayeeSheetContext.Provider value={{isSheetOpen, openSheet, closeSheet}}>
      {children}
    </PayeeSheetContext.Provider>
  );
};