import React, { useState, useEffect } from "react";
import Axios from "axios";
import CreateIcon from "@material-ui/icons/Create";
import {
  Box, Button, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});

export const UserDetails = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3000/UserDetails")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        userName: "",
        userEmail: "",
        userDesignation: "",
        userDob: "",
        age: ""
      },
    ]);
    setEdit(true);
  };

  const handleEdit = (i) => {
    const updatedRows = [...rows];
    updatedRows[i] = { ...updatedRows[i], isEditing: true };
    setRows(updatedRows);
  };

  const handleSave = (i) => {
    const updatedRow = rows[i];

    Axios.put(`http://localhost:3000/UserDetails/${updatedRow.id}`, updatedRow)
      .then(() => {
        const updatedRows = [...rows];
        updatedRows[i] = { ...updatedRows[i], isEditing: false };
        setRows(updatedRows);

        setDisable(true);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleRemoveClick = (i) => {
    const rowToDelete = rows[i];

    Axios.delete(`http://localhost:3000/UserDetails/${rowToDelete.id}`)
      .then(() => {
        const updatedRows = [...rows];
        updatedRows.splice(i, 1);
        setRows(updatedRows);
        setShowConfirm(false);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isEdit ? (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    ) : (
                      <Button align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD
                </Button>
                <Button align="right" onClick={handleEdit}>
                  <CreateIcon />
                  EDIT
                </Button>
              </div>
            )}
          </div>
        </div>
        <TableRow align="center"> </TableRow>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>UserName</TableCell>
              <TableCell>UserEmail</TableCell>
              <TableCell align="center">UserDesignation</TableCell>
              <TableCell align="center">UserDob</TableCell>
              <TableCell align="center">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <div key={row.id}>
                <TableRow>
                  {row.isEditing ? (
                    <div>
                      <TableCell padding="none">
                        <input
                          value={row.userName}
                          name="userName"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <input
                          value={row.userEmail}
                          name="userEmail"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <input
                          value={row.userDesignation}
                          name="userDesignation"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <input
                          value={row.userDob}
                          name="userDob"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <input
                          value={row.age}
                          name="age"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                    </div>
                  ) : (
                    <div>
                      <TableCell component="th" scope="row">
                        {row.userName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.userEmail}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.userDesignation}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.userDob}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.age}
                      </TableCell>
                    </div>
                  )}
                  {row.isEditing ? (
                    <Button className="mr10" onClick={handleConfirm}>
                      <ClearIcon />
                    </Button>
                  ) : (
                    <Button className="mr10" onClick={handleConfirm}>
                      <DeleteOutlineIcon />
                    </Button>
                  )}
                  {showConfirm && (
                    <div>
                      <Dialog
                        open={showConfirm}
                        onClose={handleNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure to delete
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleRemoveClick(i)}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={handleNo}
                            color="primary"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                </TableRow>
              </div>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableBody>
  );
}
