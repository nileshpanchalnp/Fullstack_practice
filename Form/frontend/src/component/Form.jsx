import React, { useEffect, useState } from "react";

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
      fetch("https://53w357tb-4000.inc1.devtunnels.ms/form/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Submission successful:", data);
          setFormData({ name: "", age: "", email: "" }); // Clear form after submission
          fetchSubmittedData(); // Refresh submitted data
        });
    }
  };

  const fetchSubmittedData = () => {
    fetch("https://53w357tb-4000.inc1.devtunnels.ms/form/getform")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setSubmittedData(data.data);
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`https://53w357tb-4000.inc1.devtunnels.ms/form/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deletion successful:", data);
        fetchSubmittedData(); // Refresh submitted data after deletion
      });
  };

  const handleUpdate = (id) => {
    fetch(`https://53w357tb-4000.inc1.devtunnels.ms/form/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update successful:", data);
        setIsEditing(false);
        setEditingId(null);
        setFormData({ name: "", age: "", email: "" }); // Clear form after update
        fetchSubmittedData(); // Refresh submitted data after update
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
