import {
  Modal,
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import API from "../helpers/axios";
import { useState } from "react";
import { nanoid } from 'nanoid'
import { useFetchUsers } from "../hooks/useFetchUsers";

const AddWorkerModal = ({ openModal, setOpenModal }) => {
  const [worker, setWorker] = useState({
    Id: nanoid(),
    FirstName: "",
    LastName: "",
    MobilePhone: "",
    StreetAddress: "",
    JobTitle: "",
    Active: false,
  });

  const [fetchWorkers] = useFetchUsers()

  const [validationRules, setValidationRules] = useState({
    FirstName: {
      required: true,
      minLength: 2,
    },
    LastName: {
      required: true,
      minLength: 2,
    },
    StreetAddress: {
      required: true,
      minLength: 2,
    },
    MobilePhone: {
      required: true,
      minLength: 2,
    },
    JobTitle: {
      required: true,
      minLength: 2,
    },
  });

  const [validationErrors, setValidationErrors] = useState({
    FirstName: [],
    LastName: [],
    MobilePhone: [],
    StreetAddress: [],
    JobTitle: [],
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "block",
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rules = validationRules[name];
    const errors = [];

    if (rules.required && !value.trim()) {
      errors.push("This field is required");
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Must be at least ${rules.minLength} characters`);
    }
    setWorker({
      ...worker,
      [name]: value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: errors,
    });
  };

  const submitForm = () => {
     if(worker.FirstName.length < 1 || worker.LastName.length < 1 || worker.JobTitle.length < 1 || worker.MobilePhone.length < 1 || worker.StreetAddress.length < 1) {
        alert('Please fill the required fields')
     }
     API.post('', worker).then(res => {
        if(res.status === 200) {
            alert('Worker added successfully')
            closeModal()
            fetchWorkers()
        } else {
            alert('Something went wrong! Please try again later')
        }
     })
  }

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
          component={"form"}
        >
          <TextField
            required
            name="FirstName"
            variant="outlined"
            label="Firstname"
            value={worker.FirstName}
            error={!!validationErrors.FirstName.length}
            helperText={validationErrors.FirstName.join(", ")}
            onChange={handleChange}
          />
          <TextField
            required
            value={worker.LastName}
            error={!!validationErrors.LastName.length}
            helperText={validationErrors.LastName.join(", ")}
            onChange={handleChange}
            name="LastName"
            variant="outlined"
            label="Lastname"
          />
          <TextField
            required
            value={worker.JobTitle}
            error={!!validationErrors.JobTitle.length}
            helperText={validationErrors.JobTitle.join(", ")}
            onChange={handleChange}
            name="JobTitle"
            variant="outlined"
            label="Job Title"
          />
          <TextField
            required
            type="number"
            value={worker.MobilePhone}
            error={!!validationErrors.MobilePhone.length}
            helperText={validationErrors.MobilePhone.join(", ")}
            onChange={handleChange}
            name="MobilePhone"
            variant="outlined"
            label="Mobile Phone"
            inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
            }}
          />
          <TextField
            value={worker.StreetAddress}
            onChange={handleChange}
            error={!!validationErrors.StreetAddress.length}
            helperText={validationErrors.StreetAddress.join(", ")}
            name="StreetAddress"
            variant="outlined"
            label="Street Address"
            required
          />
          <FormControlLabel
            control={
              <Switch
                value={worker.Active}
                onChange={() =>
                  setWorker({ ...worker, Active: !worker.Active })
                }
              />
            }
            label="Active"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={()=>submitForm()} variant="contained">Add Worker</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddWorkerModal;
