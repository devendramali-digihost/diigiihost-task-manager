"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export interface IEmployee {
  createdDate: string;            
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Deactivated'
}


interface IProps {
  list :IEmployee[]
}

export function CustomersTable({list}:IProps): React.JSX.Element {
	return (
		<Card>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: "800px" }}>
					<TableHead>
						<TableRow>
							{/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell> */}
							<TableCell sx={{ width: "10%"}}>Sr. No</TableCell>
							<TableCell sx={{ width: "15%"}}>Created Date</TableCell>
							<TableCell sx={{ width: "15%"}}>Role</TableCell>
							<TableCell sx={{ width: "20%"}}>Privileges</TableCell>
							<TableCell sx={{ width: "20%"}}>Status</TableCell>
							<TableCell sx={{ width: "20%"}}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(list) &&  list.map((empolyee,index) => {

              const { createdDate , name ,email, role, status} = empolyee;
						
							return (
								<TableRow hover>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{createdDate}</TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>Hold</TableCell>
									<TableCell padding="checkbox">
										<Checkbox
											
										/>
									</TableCell>
									<TableCell>
										<Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
											
											<Typography variant="subtitle2">{row.name}</Typography>
										</Stack>
									</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>
										{row.address.city}, {row.address.state}, {row.address.country}
									</TableCell>
									<TableCell>{row.phone}</TableCell>
									<TableCell>{dayjs(row.createdAt).format("MMM D, YYYY")}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Box>
			<Divider />
			<TablePagination
				component="div"
				count={count}
				onPageChange={noop}
				onRowsPerPageChange={noop}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
}
