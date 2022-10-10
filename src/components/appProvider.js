import { createContext, useEffect, useState } from "react";
import { arrayMove } from "../Functions";

export const context = createContext();

function Provider({ children }) {
  const [appData, setAppData] = useState({
    customers: [],
    packages: [],
  });
  const [invoices, setInvoices] = useState([]);

  function deletePackage(id) {
    const newPackages = appData.packages.filter((p) => p.id !== id);
    setAppData({ ...appData, packages: newPackages });
  }

  function addPackage(id, customerName, weight, price) {
    const customerid = appData.customers.find(
      (c) => c.name === customerName
    ).id;
    const newPackages = [
      ...appData.packages,
      { id, customerid, price, shippingOrder: 1, weight },
    ];
    setAppData({ ...appData, packages: newPackages });
  }

  function deleteCustomer(id) {
    const newPackages = appData.packages.filter((p) => p.customerid !== id);
    setAppData({
      ...appData,
      customers: appData.customers.filter((c) => c.id !== id),
      packages: newPackages,
    });
  }

  function movePkgDown(id) {
    console.log(id);
    const currentPos = appData.packages.findIndex(
      (pkg, index) => pkg.id === id
    );
    const nextPos =
      currentPos + 1 >= appData.packages.length
        ? appData.packages.length - 1
        : currentPos + 1;
    console.log(currentPos, nextPos);
    setAppData({
      ...appData,
      packages: arrayMove(appData.packages, currentPos, nextPos),
    });
  }

  function movePkgUp(id) {
    console.log(id);
    const currentPos = appData.packages.findIndex(
      (pkg, index) => pkg.id === id
    );
    const nextPos = currentPos - 1 < 0 ? 0 : currentPos - 1;
    console.log(currentPos, nextPos);
    setAppData({
      ...appData,
      packages: arrayMove(appData.packages, currentPos, nextPos),
    });
  }

  useEffect(() => {
    let shouldCancel = false;

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        if (!shouldCancel) {
          console.log(data);
          setAppData(data);
        }
      });

    return () => {
      shouldCancel = false;
    };
  }, []);

  useEffect(() => {
    let invs = [];
    appData.customers.forEach((customer) => {
      const customerId = customer.id;
      let weightNum = 0;
      let totalPrice = 0;
      const customerTotalWeight = appData.packages
        .filter((pkg) => pkg.customerid === customerId)
        .forEach((pkg) => {
          weightNum = weightNum + Number(pkg.weight.slice(0, -2));
          totalPrice += pkg.price;
        });
      weightNum = weightNum + "kg";
      invs.push({ name: customer.name, totalWeight: weightNum, totalPrice });
    });
    setInvoices(invs);
  }, [appData]);

  return (
    <context.Provider
      value={{
        appData,
        setAppData,
        invoices,
        setInvoices,
        deletePackage,
        addPackage,
        deleteCustomer,
        movePkgDown,
        movePkgUp,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default Provider;
