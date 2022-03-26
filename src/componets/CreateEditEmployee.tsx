import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Employee } from '../model/employee';

const validationSchema = yup.object({
  employee_name: yup.string().required('Name is required'),
  employee_age: yup.number().required('Age is required'),
  employee_salary: yup.number().required('Salary is required')
});

type Props = {
  show: boolean;
  employe?: Employee;
  onSave: any;
  handleClose: any;
};

export const CreateEditEmployee: FC<Props> = (props: Props) => {
  const { show, employe, onSave, handleClose } = props;

  const formik = useFormik({
    enableReinitialize: employe ? true : false,
    initialValues: {
      employee_name: employe?.employee_name,
      employee_age: employe?.employee_age,
      employee_salary: employe?.employee_salary,
      id: employe?.id
        ? employe?.id
        : Math.floor(Math.random() * (1000 - 100 + 1) + 100)
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      onSave(values);
    }
  });
  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Employe form</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              id="employee_name"
              name="employee_name"
              label="Name"
              value={formik.values.employee_name}
              onChange={formik.handleChange}
              error={
                formik.touched.employee_name &&
                Boolean(formik.errors.employee_name)
              }
              helperText={
                formik.touched.employee_name && formik.errors.employee_name
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              id="employee_age"
              name="employee_age"
              label="Age"
              value={formik.values.employee_age}
              onChange={formik.handleChange}
              error={
                formik.touched.employee_age &&
                Boolean(formik.errors.employee_age)
              }
              helperText={
                formik.touched.employee_age && formik.errors.employee_age
              }
              type="number"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              id="employee_salary"
              name="employee_salary"
              label="Salary"
              value={formik.values.employee_salary}
              onChange={formik.handleChange}
              error={
                formik.touched.employee_salary &&
                Boolean(formik.errors.employee_salary)
              }
              helperText={
                formik.touched.employee_salary && formik.errors.employee_salary
              }
              type="number"
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
