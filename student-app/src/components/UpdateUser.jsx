import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, updateUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
function UpdateUser() {
  const { id } = useParams();

  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [age, setAge] = useState();
  const [status, setStatus] = useState();

  const users = useSelector((state) => state.users.users);

  const [userDetails, setUserDetails] = useState();

  const [formData, setFormData] = useState({
    Name: "",
    age: "",
    status: "",
    Image: "",
  });

  const handleOnChange = (el) => {
    const { name, value, type } = el.target;
    const newValue = type === "file" ? el.target.files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));

    if (type === "file") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          Image: e.target.result,
        }));
      };
      reader.readAsDataURL(el.target.files[0]);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/users/" + id)
      .then((res) => {
        setUserDetails(res?.data);
        setName(res?.data?.name);
        setImage(res?.data?.image);
        setAge(res?.data?.age);
        setStatus(res?.data?.status);
      })
      .catch((err) => {
        console.log(err);
      });
    // const user = users.find((u) => u.id === id);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    const body = {
      name: name,
      image: image,
      age: age,
      status: status,
    };

    axios
      .patch("http://localhost:7000/users/" + id, body)
      .then((res) => {
        dispatch(updateUser({ id, name, image, age, status }));
        navigate("/users");
      })
      .catch((err) => console.log(err));
  };

  // const Update = (e) =>{
  //   e.preventDefault();
  //   axios.put("http://localhost:3000/update/"+id,{name,image,age,status})
  //   .then(res => {
  //     dispatch(updateUser({id, name, image, age, status}))
  //     navigate('/')
  //   })
  //     .catch(err => console.log(err))
  // }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Image</label>
            <input
              type="file"
              className="form-control"
              value={image}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="Image"
              className="form-control"
              value={age}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="status">Status : </label>
            <select
              id="status"
              name="status"
              value={status}
              type="text"
              onChange={handleOnChange}
            >
              <option value="none">None</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
