import { typeListOrders } from "../types/typeListOrders";
import { typeOrder } from "../types/typeOrder";

/**
 *  Questa funzione serve per raggruppare gli ordini per il loro status,
 *  ritornando un array che contiene questi gruppi e gli ordini.
 *
 * @param orders: typeOrder[] - array con gli ordini
 * @returns typeListOrders[] - array di tipo typeListOrders, con gli ordini raggruppati per il nome
 */

export const groupOrdersByStatus = (orders: typeOrder[]): typeListOrders[] => {
  return orders.reduce((acc: typeListOrders[], curr: typeOrder) => {
    const existingList = acc.find((list) => list.statusID === curr.statusID);
    if (existingList) {
      existingList.orders.push(curr);
    } else {
      acc.push({ statusID: curr.statusID, orders: [curr] });
    }
    return acc;
  }, []);
};
