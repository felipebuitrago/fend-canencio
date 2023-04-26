import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const DeleteConfirmDialog = ({ open, onClose, onConfirm, title }) => (
  <Dialog open={open} onClose={onClose}>
     <DialogTitle>{title || "¿Estás seguro de que deseas eliminar este elemento?"}</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="error">
        Cancelar
      </Button>
      <Button onClick={onConfirm} color="success">
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmDialog;