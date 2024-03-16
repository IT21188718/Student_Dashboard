import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../redux/userSlice";
import { useEffect, useState } from "react";


function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const [getUsersObj, setGetUsersObj] = useState();

  const getUsers = () => {
    axios
      .get("http://localhost:7000/users")
      .then((result) => setGetUsersObj(result.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:7000/users/" + id)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>image</th>
              <th>age</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {getUsersObj?.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.image}</td>
                  <td>{user.age}</td>
                  <td>{user.status}</td>
                  <td style={{display: 'flex'}}>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm btn-danger me-2 "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
