import { TransactionDB } from "@/data/TransactionDB";
import {
  getFullDate,
  getMonthName,
  mapTransactionDBToTransactionResponse,
} from "@/domain/mappers/transactionMappers";
import { Transaction } from "@/domain/models/Transaction";
import { db } from "@/firebase/config";
import { doc, addDoc, collection, getDoc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITransactionContext {
  transactions: Transaction[];
  getTransactions: (userId: string) => void;
  addTransactions: (userId: string, value: number, type: string) => void;
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
        const mappedList = docSnap.data().transactions;
        setTransactions(mappedList);
        console.log("Document: ", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const addTransactions = async (
    userId: string,
    value: number,
    type: string
  ) => {
    try {
      const docRef = doc(db, "user-transactions", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const formattedValue = formatter.format(value);
        const date = new Date();
        const fullDate = getFullDate(date.toISOString());
        const month = getMonthName(date.toISOString());
        const newTransaction = {
          accountId: userId,
          date: date,
          fullDate: fullDate,
          id: docSnap.data().transactions.length + 1,
          month: month,
          valueNumber: type === "Credit" ? value : value * -1,
          formattedValue: formattedValue,
          type,
        };
        const updatedTransactions = [
          ...docSnap.data().transactions,
          newTransaction,
        ];
        await setDoc(docRef, { transactions: updatedTransactions })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        setTransactions(updatedTransactions);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransactions,
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
