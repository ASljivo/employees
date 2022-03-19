import React, { FC, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';

import { Employee } from '../model/employee';

import useApi from '../hooks/useApi';
import EmployeeService from '../services/employes';

interface Props {
  data: Employee[];
}

export const EmployeesTable: FC<Props> = (props: Props) => {
  const { data } = props;
  const { fetch } = useApi(EmployeeService.deleteById);
  const [employees, setEmployees] = useState<Employee[]>(data);
  
  const deleteEmploye = (id:number) => {
    fetch().then(() => {
      setEmployees(data.filter(item=>item.id !==id))
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(row => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.employee_name}</TableCell>
              <TableCell align="right">{row.employee_age}</TableCell>
              <TableCell align="right">{row.employee_salary}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="secondary">
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={(): void => deleteEmploye(row.id)}>
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
