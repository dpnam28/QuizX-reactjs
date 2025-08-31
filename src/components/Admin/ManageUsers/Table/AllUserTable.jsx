import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { useTranslation } from "react-i18next";
function AllUserTable(props) {
  let {
    listAllUsersWithPagination,
    setShowUpdate,
    setShowView,
    setShowDelete,
    fetchListUserWithPagination,
    currentPage,
    setCurrentPage,
  } = props;
  const { t } = useTranslation();
  // useEffect(() => {}, [listAllUsers]);
  const handlePageClick = (event) => {
    fetchListUserWithPagination(event.selected + 1);
    setCurrentPage(event.selected + 1);
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
          {t("admin.user-management.list-all-users")}
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th> {t("admin.user-management.username")}</th>
            <th>{t("admin.user-management.email")}</th>
            <th>{t("admin.user-management.role")}</th>
            <th>{t("admin.user-management.action")}</th>
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
                      {t("admin.user-management.update")}
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
                      {t("admin.user-management.delete")}
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
          nextLabel={t("admin.user-management.next")}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={listAllUsersWithPagination?.totalPages ?? 0}
          previousLabel={t("admin.user-management.previous")}
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
