import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import _ from "lodash";

function AllUserTable(props) {
  let {
    listAllUsersWithPagination,
    setShowUpdate,
    setShowView,
    setShowDelete,
    fetchListUserWithPagination,
  } = props;

  // useEffect(() => {}, [listAllUsers]);
  const handlePageClick = (event) => {
    fetchListUserWithPagination(event.selected + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <Table
        striped
        bordered
        hover
        className="m-auto w-[80%] align-middle text-center"
      >
        <caption className="caption-top text-center sm:text-xl text-sm">
          List all participants
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(listAllUsersWithPagination.users) ? (
            listAllUsersWithPagination.users.map((user, index) => {
              return (
                <tr
                  key={user.id}
                  className="cursor-pointer"
                  onClick={() => setShowView(user)}
                >
                  <td>{user?.id ?? "no id"}</td>
                  <td>{user?.username ?? "no username"}</td>
                  <td>{user?.email ?? "no email"}</td>
                  <td>{user?.role ?? "no role"}</td>
                  <td>{user?.image ? "has image" : "no image"}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className="font-semibold m-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUpdate(user);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="font-semibold px-2.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDelete(user);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center border-none">
                Not found data
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="mt-5">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={listAllUsersWithPagination?.totalPages ?? 0}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default AllUserTable;
