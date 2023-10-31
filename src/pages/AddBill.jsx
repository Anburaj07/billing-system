import React, { useState } from "react";
import styled from "styled-components";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const AddBill = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name,
      price,
    };
    axios.post(`http://localhost:8080/bills`,obj)
    .then((res)=>res.data)
    .catch((err)=>console.log(err))
    navigate('/')
  };
  return (
    <DIV>
      <Heading>Add Item</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <Input
            type="submit"
            value="Add now"
            _hover={{
              backgroundColor: "gray",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          />
        </FormControl>
      </form>
    </DIV>
  );
};

const DIV = styled.div`
  padding: 40px;
  form {
    width: 35%;
    margin: auto;
    padding: 15px;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
    margin-top: 15px;
  }
  height: 750px;
`;

export default AddBill;
