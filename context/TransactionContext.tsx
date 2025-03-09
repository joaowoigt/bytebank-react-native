import { getFullDate, getMonthName } from "@/domain/mappers/transactionMappers";
import { Transaction } from "@/domain/models/Transaction";
import { db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITransactionContext {
  transactions: Transaction[];
  getFilteredList: (type: string) => Transaction[];
  balance: string;
  getTransactions: (userId: string) => void;
  addTransactions: (
    userId: string,
    value: number,
    type: string
  ) => Promise<boolean>;
  editTransaction: (
    userId: string,
    id: number,
    value: number,
    type: string
  ) => Promise<boolean>;
}

const TransactionContext = createContext<ITransactionContext | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState("");

  const getTransactions = async (userId: string) => {
    try {
      const docRef = doc(db, "user-transactions", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const mappedList = docSnap.data().transactions;
        const balance = mappedList.reduce(
          (acc: number, transaction: Transaction) => {
            return acc + transaction.valueNumber;
          },
          0
        );
        setBalance(formatBalanceForView(balance));
        setTransactions(mappedList);
      } else {
        console.log("No such document!");
        setBalance("R$ 0,00");
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
        const newTransaction = createNewTransaction(
          value,
          type,
          userId,
          docSnap.data().transactions.length + 1
        );
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
        setBalance(getBalance(updatedTransactions));
        return true;
      } else {
        console.log("No such document yet! Creating new document...");
        const newTransaction = createNewTransaction(value, type, userId, 1);
        const docRef = doc(db, "user-transactions", userId);
        const newDoc = await setDoc(docRef, { transactions: [newTransaction] });
        setTransactions([newTransaction]);
        setBalance(getBalance([newTransaction]));
        console.log("Document written : ", newDoc);
        return true;
      }
    } catch (error) {
      console.error("Error adding document:", error);
      return false;
    }
  };

  const getFilteredList = (type: string) => {
    if (type === "all") {
      return transactions;
    }
    return transactions.filter((transaction) => transaction.type === type);
  };

  const editTransaction = async (
    userId: string,
    id: number,
    newValue: number,
    newType: string
  ) => {
    const oldTransaction = transactions.find(({ id }) => id == 1);
    if (!oldTransaction) {
      return false;
    }
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const formattedValue = formatter.format(newValue);

    const newTransaction = {
      accountId: oldTransaction.accountId,
      date: oldTransaction.date,
      fullDate: oldTransaction.fullDate,
      id: id,
      month: oldTransaction.month,
      valueNumber: newType === "credit" ? newValue : newValue * -1,
      formattedValue:
        newType === "credit" ? formattedValue : "-" + formattedValue,
      type: newType,
    };
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        return newTransaction;
      }
      return transaction;
    });
    const docRef = doc(db, "user-transactions", userId);
    await setDoc(docRef, { transactions: updatedTransactions })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        return false;
      });
    setTransactions(updatedTransactions);
    setBalance(getBalance(updatedTransactions));
    return true;
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        addTransactions,
        getTransactions,
        getFilteredList,
        editTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

function createNewTransaction(
  value: number,
  type: string,
  userId: string,
  id: number
) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formattedValue = formatter.format(value);
  const date = new Date();
  const dateString = date.toISOString();
  const fullDate = getFullDate(date.toISOString());
  const month = getMonthName(date.toISOString());
  return {
    accountId: userId,
    date: dateString,
    fullDate: fullDate,
    id: id,
    month: month,
    valueNumber: type === "credit" ? value : value * -1,
    formattedValue: type === "credit" ? formattedValue : "-" + formattedValue,
    type,
  };
}

function getBalance(transactions: Transaction[]): string {
  const balance = transactions.reduce(
    (acc: number, transaction: Transaction) => {
      return acc + transaction.valueNumber;
    },
    0
  );
  return formatBalanceForView(balance);
}

function formatBalanceForView(balance: number): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(balance);
}

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
