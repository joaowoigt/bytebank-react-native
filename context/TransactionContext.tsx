import { TransactionDB } from "@/data/TransactionDB";
import { mapTransactionDBToTransactionResponse } from "@/domain/mappers/transactionMappers";
import { Transaction } from "@/domain/models/Transaction";
import { db } from "@/firebase/config";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITransactionContext {
  transactions: Transaction[];
  getTransactions: (userId: string) => void;
}

const TransactionContext = createContext<ITransactionContext | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const getTransactions = async (userId: string) => {
    try {
      const docRef = doc(db, "user-transactions", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const mappedList = docSnap
          .data()
          .transactions.map((item: TransactionDB) => {
            return mapTransactionDBToTransactionResponse(item);
          });
        setTransactions(mappedList);
        console.log("Document: ", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        getTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
