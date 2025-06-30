import React, { useMemo, Fragment, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  Table,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col md={4}>
      <Input
        type="text"
        className="form-control"
        placeholder={`Search ${count} records...`}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Col>
  );
}

function Filter() {
  return null;
}

const TableContainer = ({
  columns,
  data,
  customPageSize,
  className,
  isGlobalFilter,
  setModalOpen,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={2}>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        <Col md={6}>
          <div className="d-flex justify-content-end">
            <Link to="/add-project"  className="btn btn-primary">
              Add Project
            </Link>
          </div>
        </Col>
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div {...column.getSortByToggleProps()}>{column.render("Header")}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center mt-3">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </Button>
            <Button color="primary" onClick={previousPage} disabled={!canPreviousPage}>
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            max={pageOptions.length}
            style={{ width: 70 }}
            value={pageIndex + 1}
            onChange={(e) => gotoPage(Number(e.target.value) - 1)}
          />
        </Col>
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button color="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  customPageSize: PropTypes.number,
  className: PropTypes.string,
  isGlobalFilter: PropTypes.bool,
  setModalOpen: PropTypes.func.isRequired,
};
const Projectlist = () => {
  const [projectData, setprojectData] = useState([
  {
      id: 1,
      createdDate: "2024-06-01",
      projectName: "Website Redesign",
      client: "Acme Corp",
      startDate: "2024-06-05",
      endDate: "2024-07-15",
      status: "Active"
    },
    {
      id: 2,
      createdDate: "2024-06-10",
      projectName: "Mobile App Development",
      client: "Globex Ltd",
      startDate: "2024-06-12",
      endDate: "2024-08-30",
      status: "Inactive"
    },
    {
      id: 3,
      createdDate: "2024-05-20",
      projectName: "CRM Integration",
      client: "Initech",
      startDate: "2024-05-25",
      endDate: "2024-07-05",
      status: "Active"
    },
    {
      id: 4,
      createdDate: "2024-06-03",
      projectName: "E-Commerce Backend",
      client: "Soylent Corp",
      startDate: "2024-06-06",
      endDate: "2024-07-30",
      status: "Inactive"
    },
    {
      id: 5,
      createdDate: "2024-06-08",
      projectName: "SEO Optimization",
      client: "Hooli",
      startDate: "2024-06-10",
      endDate: "2024-07-20",
      status: "Active"
    },
    {
      id: 6,
      createdDate: "2024-06-15",
      projectName: "API Gateway Setup",
      client: "Umbrella Corp",
      startDate: "2024-06-17",
      endDate: "2024-07-25",
      status: "Active"
    },
    {
      id: 7,
      createdDate: "2024-06-18",
      projectName: "Performance Tuning",
      client: "Wayne Enterprises",
      startDate: "2024-06-20",
      endDate: "2024-08-05",
      status: "Inactive"
    },
    {
      id: 8,
      createdDate: "2024-06-20",
      projectName: "Data Migration",
      client: "Cyberdyne Systems",
      startDate: "2024-06-22",
      endDate: "2024-07-22",
      status: "Active"
    },
    {
      id: 9,
      createdDate: "2024-06-22",
      projectName: "Cloud Deployment",
      client: "Stark Industries",
      startDate: "2024-06-24",
      endDate: "2024-08-01",
      status: "Active"
    },
    {
      id: 10,
      createdDate: "2024-06-25",
      projectName: "DevOps Automation",
      client: "Pied Piper",
      startDate: "2024-06-27",
      endDate: "2024-07-28",
      status: "Inactive"
    }
   ]);
 
   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpen1, setModalOpen1] = useState(false);
 
   const handleStatusToggle = (id) => {
     setprojectData((prevList) =>
       prevList.map((item) =>
         item.id === id
           ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
           : item
       )
     );
   };
 
   const columns = useMemo(() => [
     {
       Header: "No.",
       accessor: (_row, i) => i + 1,
     },
     { Header: "Created Date", accessor: "createdDate" },
     { Header: "Project Name", accessor: "projectName" },
     { Header: "Client", accessor: "client" },
     { Header: "Start Date", accessor: "startDate" },
     { Header: "End Date", accessor: "endDate" },
     {
       Header: "Status",
       accessor: "status",
       Cell: ({ row }) => {
         const isActive = row.original.status === "Active";
         return (
           <div className="form-check form-switch">
             <input
               type="checkbox"
               className="form-check-input"
               id={`switch-${row.original.id}`}
               checked={isActive}
               onChange={() => handleStatusToggle(row.original.id)}
             />
             <label className="form-check-label" htmlFor={`switch-${row.original.id}`}>
               {isActive ? "Active" : "Inactive"}
             </label>
           </div>
         );
       },
     },
     {
       Header: "Option",
       Cell: ({ row }) => (
         <div className="d-flex gap-2">
           <Link to="/update-project" color="primary" size="sm" className="btn btn-primary">
             Edit
           </Link>
           <Button color="danger" size="sm" onClick={() => alert(`Delete ${row.original.name}`)}>
             Delete
           </Button>
         </div>
       ),
     },
   ], [projectData]);
 
   const breadcrumbItems = [
     { title: "Dashboard", link: "/" },
     { title: "Project list", link: "#" },
   ];
 
   return (
     <Fragment>
       <div className="page-content">
         <Container fluid>
           <Breadcrumbs title="PROJECT LIST" breadcrumbItems={breadcrumbItems} />
           <Card>
             <CardBody>
               <TableContainer
                 columns={columns}
                 data={projectData}
                 customPageSize={10}
                 isGlobalFilter={true}
                 setModalOpen={setModalOpen}
               />
             </CardBody>
           </Card>
         </Container>
 
      
       </div>
     </Fragment>
   );
 };

export default Projectlist
