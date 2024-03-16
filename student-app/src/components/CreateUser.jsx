import axios from "axios";
import { useState } from "react";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [age, setAge] = useState();
  const [status, setStatus] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name: name,
      image: image,
      age: age,
      status: status,
    };
   

    axios
      .post("http://localhost:7000/users", body)
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/users");
      })
      .catch((err) => console.log(err));
  };
  const [formData, setFormData] = useState({
    Name: "",
    age: "",
    status: "",
    Image: ""
  });

  

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>

          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
          <label htmlFor="status">Status            :   </label>
                <select id="status" name="status"  onChange={handleOnChange} >
                  <option value="none">None</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
