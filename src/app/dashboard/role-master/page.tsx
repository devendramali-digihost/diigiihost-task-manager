
import React, { useState } from 'react'
import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";
import dayjs from "dayjs";

import { CustomersFilters } from "@/components/dashboard/customer/empolyee-filters";
// import { RoleMasterTable } from "@/components/dashboard/customer/empolyee-table";
import type { IRoleMaster } from "@/components/dashboard/role-master/role-master-table";
import { RoleMasterTable } from "@/components/dashboard/role-master/role-master-table";
import { config } from "@/config";
export const metadata = { title: `Master Role | Dashboard | ${config.site.name}` } satisfies Metadata;
export let EmpolyeeListConfig: IRoleMaster[] = [
  {
    createdDate: "2025-06-20",
    email: "amit.kumar@example.com",
    role: "Admin",
    status: "Active"
  },
  {
    createdDate: "2025-06-19",
    email: "priya.sharma@example.com",
    role: "Manager",
    status: "Deactivated"
  },
  {
    createdDate: "2025-06-18",
    email: "rahul.verma@example.com",
    role: "Developer",
    status: "Active"
  },
  {
    createdDate: "2025-06-17",
    email: "neha.joshi@example.com",
    role: "HR",
    status: "Deactivated"
  },
  {
    createdDate: "2025-06-16",
    email: "siddharth.mehta@example.com",
    role: "Intern",
    status: "Active"
  }
];
const page = () => {
  return (
 	<Stack spacing={3}>
			<Stack direction="row" spacing={3}>
				<Stack spacing={1} sx={{ flex: "1 1 auto" }}>
					<Typography variant="h4">Role Master Page</Typography>
					{/* <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
						<Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
							Import
						</Button>
						<Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
							Export
						</Button> 
					</Stack>*/}
				</Stack>
				<div>
					<Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" sx={
                        { backgroundColor: "#36766e" }
                    }>
						Add
					</Button>
				</div>
			</Stack>
			<CustomersFilters />
			<RoleMasterTable list={EmpolyeeListConfig} />
		</Stack>
  )
}

export default page
