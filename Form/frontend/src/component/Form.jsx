import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update the existing data
      handleUpdate(editingId);
    } else {
      // Submit new form data
      axios
        .post("https://53w357tb-4000.inc1.devtunnels.ms/form/create", formData)
        .then((response) => {
          console.log("Submission successful:", response.data);
          setFormData({ name: "", age: "", email: "" }); // Clear form after submission
          fetchSubmittedData(); // Refresh submitted data
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
        });
    }
  };

  const fetchSubmittedData = () => {
    axios
      .get("https://53w357tb-4000.inc1.devtunnels.ms/form/getform")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setSubmittedData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://53w357tb-4000.inc1.devtunnels.ms/form/delete/${id}`)
      .then((response) => {
        console.log("Deletion successful:", response.data);
        fetchSubmittedData(); // Refresh submitted data after deletion
      })
      .catch((error) => {
        console.error("There was an error deleting the data!", error);
      });
  };

  const handleUpdate = (id) => {
    axios
      .put(
        `https://53w357tb-4000.inc1.devtunnels.ms/form/update/${id}`,
        formData
      )
      .then((response) => {
        console.log("Update successful:", response.data);
        setIsEditing(false);
        setEditingId(null);
        setFormData({ name: "", age: "", email: "" }); // Clear form after update
        fetchSubmittedData(); // Refresh submitted data after update
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  const handleEditClick = (data) => {
    setIsEditing(true);
    setEditingId(data._id);
    setFormData({
      name: data.name,
      age: data.age,
      email: data.email,
    });
  };

  useEffect(() => {
    fetchSubmittedData(); // Fetch data when component mounts
  }, []);

  return (
    <>
      <div className="body">
        <div className="component">
          <div className="row">
            <h1>{isEditing ? "Edit Form" : "Form"}</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Enter Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="age">Enter Age:</label>
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />

              <button type="submit" className="button">
                {isEditing ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>

        <div className="lasttable">
          <h2>Submitted Data:</h2>
          <table>
            <tr className="trhead">
              <td>No</td>
              <td>Name</td>
              <td>Age</td>
              <td>Email</td>
              <td>Delete</td>
              <td>Edit</td>
            </tr>
            {submittedData.length > 0 ? (
              submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.email}</td>
                  <td>
                    {" "}
                    <button onClick={() => handleDelete(data._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button onClick={() => handleEditClick(data)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <li>No submitted data yet.</li>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Form;
