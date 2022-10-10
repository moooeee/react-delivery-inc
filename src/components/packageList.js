import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { context } from "./appProvider";
import Layout from "./layout";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  borderRadius: "15px",
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  flexDirection: "column",
};

function PackageList() {
  const { appData, deletePackage, addPackage, movePkgDown, movePkgUp } =
    useContext(context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pkgId, setPkgId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [pkgWeight, setPkgWeight] = useState("");
  const [pkgPrice, setPkgPrice] = useState("");

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={function () {
                    setIsModalOpen(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {appData.packages.map((row) => {
              const customer = appData.customers.find(
                (c) => c.id === row.customerid
              );
              return (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={function () {
                        console.log("helo");
                        deletePackage(row.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Box
                      style={{ display: "inline-block", marginLeft: "20px" }}
                    >
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={function () {
                          movePkgUp(row.id);
                        }}
                      >
                        <ExpandLessIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={function () {
                          movePkgDown(row.id);
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isModalOpen}
        onClose={function () {
          setIsModalOpen(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <Box sx={style}>
            <Box>Add Package</Box>
            <TextField
              id="outlined-basic"
              label="package id"
              variant="outlined"
              value={pkgId}
              onChange={function (e) {
                setPkgId(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="customer's name"
              variant="outlined"
              value={customerName}
              onChange={function (e) {
                setCustomerName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="package weight"
              variant="outlined"
              value={pkgWeight}
              onChange={function (e) {
                setPkgWeight(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="price"
              variant="outlined"
              value={pkgPrice}
              onChange={function (e) {
                setPkgPrice(e.target.value);
              }}
            />
            <Button
              onClick={function () {
                addPackage(pkgId, customerName, pkgWeight, Number(pkgPrice));
                setPkgId("");
                setCustomerName("");
                setPkgWeight("");
                setPkgPrice("");
                setIsModalOpen(false);
              }}
            >
              Add package
            </Button>
          </Box>
        </Box>
      </Modal>
    </Layout>
  );
}

export default PackageList;
