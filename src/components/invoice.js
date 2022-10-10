import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { context } from "./appProvider";
import Layout from "./layout";

function Invoice() {
  const { id } = useParams();
  const { appData, invoices } = useContext(context);

  const customer = appData.customers.find((c) => {
    return c.id === Number(id);
  });

  const invoiceId = Math.floor(Math.random() * 10000);

  const totalPkgs = appData.packages.filter((p) => p.customerid === Number(id));

  const customerInvoice = invoices.find((c) => c.name === customer.name);

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return (
    <Layout>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            justifyContent: "space-between",
          }}
        >
          <Box>{formattedToday}</Box>
          <Box>{customer.name}</Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant="h4">Invoice</Typography>
          <Box>No. {invoiceId}</Box>
        </Box>
      </Box>
      <TableContainer component={Paper} style={{ textAlign: "center" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {totalPkgs.map((pkg) => {
              return (
                <TableRow>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.weight}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell></TableCell>
              <TableCell>total: {customerInvoice.totalWeight}</TableCell>
              <TableCell>Total price: {customerInvoice.totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{ marginTop: "50px" }}>
        <Box>You received {totalPkgs.length} packages!</Box>
        <Box>Thank you for using our services!</Box>
      </Box>
    </Layout>
  );
}

export default Invoice;
