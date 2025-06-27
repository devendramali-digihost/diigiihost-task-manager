import * as React from "react";
import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";
import dayjs from "dayjs";

import { config } from "@/config";
import { CustomersFilters } from "@/components/dashboard/customer/empolyee-filters";
import { CustomersTable } from "@/components/dashboard/customer/empolyee-table";
import type { IEmployee } from "@/components/dashboard/customer/empolyee-table";

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export let EmpolyeeListConfig: IEmployee[] = [
  {
    createdDate: "2025-06-20",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    role: "Admin",
    status: "Active"
  },
  {
    createdDate: "2025-06-19",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Manager",
    status: "Deactivated"
  },
  {
    createdDate: "2025-06-18",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    role: "Developer",
    status: "Active"
  },
  {
    createdDate: "2025-06-17",
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    role: "HR",
    status: "Deactivated"
  },
  {
    createdDate: "2025-06-16",
    name: "Siddharth Mehta",
    email: "siddharth.mehta@example.com",
    role: "Intern",
    status: "Active"
  }
];

export default function EmpolyeesListPage(): React.JSX.Element {
	return (
		<Stack spacing={3}>
			<Stack direction="row" spacing={3}>
				<Stack spacing={1} sx={{ flex: "1 1 auto" }}>
					<Typography variant="h4">Employee List Page</Typography>
					<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
						<Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
							Import
						</Button>
						<Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
							Export
						</Button>
					</Stack>
				</Stack>
				<div>
					<Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
						Add
					</Button>
				</div>
			</Stack>
			<CustomersFilters />
			<CustomersTable list={EmpolyeeListConfig} />
		</Stack>
	);
}
