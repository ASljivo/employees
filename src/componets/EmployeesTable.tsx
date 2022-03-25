import { FC, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Stack } from '@mui/material';

import { Employee } from '../model/employee';

import useApi from '../hooks/useApi';
import EmployeeService from '../services/employes';
import { CreateEditEmployee } from '../componets/CreateEditEmployee';

interface Props {
  data: Employee[];
}

export const EmployeesTable: FC<Props> = (props: Props) => {
  const { data } = props;
  const { fetch: deleteApi, isLoading: isLoadingDelete } = useApi(
    EmployeeService.deleteById
  );
  const { fetch: updateApi, isLoading: isLoadingUpdate } = useApi(
    EmployeeService.update
  );
  const { fetch: createApi, isLoading: isLoadingCreate } = useApi(
    EmployeeService.create
  );
  const [employees, setEmployees] = useState<Employee[]>(data);
  const [showEmployeForm, setShowEmployeForm] = useState<boolean>(false);
  const [selectedEmploye, setSelectedmploye] = useState<Employee>();

  const handleClickOpenModal = () => {
    setShowEmployeForm(true);
  };

  const handleClose = () => {
    setShowEmployeForm(false);
  };

  const editEmploye = (employe: Employee) => {
    setSelectedmploye(employe);
    setShowEmployeForm(true);
  };

  const deleteEmploye = (id: number) => {
    deleteApi().then(() => {
      setEmployees([]);
      setEmployees(data.filter(item => item.id !== id));
    });
  };

  const addEditEmploye = (values: Employee) => {
    const data = [...employees];
    if (selectedEmploye) {
      updateApi(selectedEmploye).then(() => {
        const objIndex = data.findIndex((obj: Employee) => obj.id === 1);
        data[objIndex] = values;
        setEmployees(data);
        setShowEmployeForm(false);
      });
    } else {
      createApi().then(() => {
        data.unshift(values);
        setEmployees(data);
        setShowEmployeForm(false);
      });
    }
    handleClose();
  };

  return (
    <>
      {(isLoadingDelete || isLoadingUpdate || isLoadingCreate) && (
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            bottom: 0,
            right: '50%'
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Stack spacing={2} direction="row-reverse" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleClickOpenModal}>
          Add new
        </Button>
      </Stack>
      <CreateEditEmployee
        show={showEmployeForm}
        onSave={addEditEmploye}
        handleClose={handleClose}
        employe={selectedEmploye}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1050 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(row => (
              <TableRow
                key={row.id + row.employee_age}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.employee_name}</TableCell>
                <TableCell align="right">{row.employee_age}</TableCell>
                <TableCell align="right">{row.employee_salary}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(): void => editEmploye(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(): void => deleteEmploye(row.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
