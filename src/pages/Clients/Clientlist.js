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
import deleteimg from "../../assets/images/delete.png"; 

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
            <Link to="/add-client"  className="btn btn-primary">
              Add
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

const Clientlist = () => {
 const [rolelist, setRolelist] = useState([
   {
      createdDate: "2025-06-01",
      companyName: "Google",
      contactPerson: "Sundar Pichai",
      email: "sundar@google.com",
      phone: "1234567890",
      notes: "Global tech leader",
      status: "Active",
    },
    {
      createdDate: "2025-06-10",
      companyName: "Microsoft",
      contactPerson: "Satya Nadella",
      email: "satya@microsoft.com",
      phone: "9876543210",
      notes: "Cloud services and software",
      status: "Inactive",
    },
    {
      createdDate: "2025-06-15",
      companyName: "Amazon",
      contactPerson: "Andy Jassy",
      email: "andy@amazon.com",
      phone: "1122334455",
      notes: "E-commerce and AWS",
      status: "Active",
    },
   ]);
 
   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpen1, setModalOpen1] = useState(false);
 
   const handleStatusToggle = (id) => {
     setRolelist((prevList) =>
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
     { Header: "Company Name", accessor: "companyName" },
     { Header: "Contact Person", accessor: "contactPerson" },
     { Header: "Email", accessor: "email" },
     { Header: "Phone", accessor: "phone" },
     { Header: "Notes", accessor: "notes" },
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
           <Link to="/update-client" color="primary" size="sm" className="btn btn-primary">
             Edit
           </Link>
           <Button color="danger" size="sm"  onClick={() => setModalOpen2(true)}>
             Delete
           </Button>
         </div>
       ),
     },
   ], [rolelist]);
 
   const breadcrumbItems = [
     { title: "Dashboard", link: "/" },
     { title: "Client", link: "#" },
   ];
   const [modalOpen2, setModalOpen2] = useState(false);
 
   return (
     <Fragment>
       <div className="page-content">
         <Container fluid>
           <Breadcrumbs title="CLIENT" breadcrumbItems={breadcrumbItems} />
           <Card>
             <CardBody>
               <TableContainer
                 columns={columns}
                 data={rolelist}
                 customPageSize={10}
                 isGlobalFilter={true}
                 setModalOpen={setModalOpen}
               />
             </CardBody>
           </Card>
         </Container>
              {/*  Modal for Delete Confirmation */}
                 <Modal  isOpen={modalOpen2} toggle={() => setModalOpen2(!modalOpen2)}>
                   {/* <ModalHeader className="position-absolute right-0 top-0 w-100 z-1" toggle={() => setModalOpen2(!modalOpen2)}></ModalHeader> */}
                   <ModalBody className="mt-3">
                    <h4 className="p-3 text-center">Do you really want to <br/> delete the file?</h4>
                    <div className="d-flex justify-content-center">
                     <img src={deleteimg} alt="Privilege Icon" width={"70%"} className="mb-3 m-auto" />
                    </div>
                   </ModalBody>
                   <ModalFooter>
                     <Button color="danger" onClick={() => setModalOpen2(false)}>
                       Delete
                     </Button>
                     <Button color="secondary" onClick={() => setModalOpen2(false)}>
                       Cancel
                     </Button>
                   </ModalFooter>
                 </Modal>
 
      
       </div>
     </Fragment>
   );
 };
export default Clientlist
