import { Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import styled from "styled-components";

const Home = () => {
  const [items, setItems] = useState([]);
  const [lodaing, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/bills`)
      .then((res) => {
        setLoading(false);
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleItemUpdate = () => {
    // You might want to refresh the data after an update
    axios
      .get(`http://localhost:8080/bills`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete=(id)=>{
    axios
    .delete(`http://localhost:8080/bills/${id}`)
    .then((res) => {
      handleItemUpdate()
    })
    .catch((err) => console.log(err));
  }
  return (
    <div>
      {lodaing && (
        <div>
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </div>
      )}
      <DIV>
      {items.map((el)=>(
        <Item key={el.id} {...el} onUpdate={handleItemUpdate} handleDelete={handleDelete}/>
      ))}
      </DIV>
    </div>
  );
};

export default Home;

const DIV=styled.div`
width: 70%;
margin: auto;
padding: 2%;
border-radius: 15px;
background-color: #d7d0d0;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin-top: 50px;
`