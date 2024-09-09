import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./Dashboard.css";

const columns = [
    { id: "id", label: "#", minWidth: 15 },
    { id: "customer_name", label: "Customer Name", minWidth: 150 },
    { id: "mobile", label: "Mobile", minWidth: 110 },
    { id: "email", label: "Email", minWidth: 250 },
    { id: "address", label: "Address", minWidth: 180 },
    { id: "product_id", label: "Product id", minWidth: 100 },
    { id: "product_name", label: "Product Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 60 },
    { id: "delivery_date", label: "Delivery Date", minWidth: 100 },
    { id: "order_status", label: "Delivery Status", minWidth: 100 },
    { id: "purchase_date", label: "Purchase Date", minWidth: 100 },
];

function createData(
    id,
    customer_name,
    mobile,
    email,
    address,
    product_id,
    product_name,
    price,
    delivery_date,
    order_status,
    purchase_date
) {
    const status = order_status ? "delivered" : "pending";
    return {
        id,
        customer_name,
        mobile,
        email,
        address,
        product_id,
        product_name,
        price,
        delivery_date,
        status,
        purchase_date,
    };
}

const Dashboard = () => {
    // Data fetching..
    const [tableData, setTableData] = React.useState([]);
    React.useEffect(() => {
        fetch("https://rocky-dawn-74128.herokuapp.com/orders")
            .then((res) => res.json())
            .then((data) => setTableData(data));
    }, []);
    console.log(tableData);
    {
        tableData.length &&
            tableData.map((d) => {
                if (d.order_status) {
                    d.order_status = "delivered";
                } else {
                    d.order_status = "pending";
                }
            });
    }
    console.log(tableData);
    const rows = tableData;
    // Data per page funstions
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div className="dashboard">
            <div className="container">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default Dashboard;
