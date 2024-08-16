const express = require("express");
const FormData = require("../model/form");

// Get form data
const getForm = async (req, res) => {
  try {
    const data = await FormData.find();
    res.json({
      data: data,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

// Create form data
const createForm = async (req, res) => {
  try {
    const req_body = req.body;

    const name = req_body.name;
    const age = req_body.age;
    const email = req_body.email;

    await FormData.create({
      name: name,
      age: age,
      email: email,
    });
    res.json({
      msg: "Form data created",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

// Update form data
const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const req_body = req.body;

    const updatedData = await FormData.findByIdAndUpdate(id, req_body, {
      new: true,
    });

    if (updatedData) {
      res.json({
        msg: "Form data updated",
        data: updatedData,
      });
    } else {
      res.json({
        msg: "Form data not found",
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

// Delete form data
const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await FormData.findByIdAndDelete(id);

    if (deletedData) {
      res.json({
        msg: "Form data deleted",
      });
    } else {
      res.json({
        msg: "Form data not found",
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = { getForm, createForm, updateForm, deleteForm };
