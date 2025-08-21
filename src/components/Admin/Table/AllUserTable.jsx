import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import _ from "lodash";

function AllUserTable(props) {
  let { listAllUsers, setListAllUsers } = props;

  return (
    <>
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
          {!_.isEmpty(listAllUsers) ? (
            listAllUsers.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user?.username ?? "no username"}</td>
                  <td>{user?.email ?? "no email"}</td>
                  <td>{user?.role ?? "no role"}</td>
                  <td>{/* user?.image ??  */ "no image"}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className="font-semibold m-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="font-semibold px-2.5"
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
    </>
  );
}

export default AllUserTable;
