import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import styled from "styled-components";

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const EditForm = ({ id, onCancel, onUpdate }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");
  const firstFieldRef = useRef();

  useEffect(() => {
    // Fetch data for the specified ID or initialize data if needed
    axios.get(`http://localhost:8080/bills/${id}`).then((res) => {
      const { name, price, sold } = res.data; // Adjust the property names accordingly
      setName(name);
      setPrice(price);
      setSold(sold);
    });
  }, [id]);

  const handleUpdate = () => {
    // Update data on the server
    axios
      .put(`http://localhost:8080/bills/${id}`, { name, price, sold })
      .then(() => {
        onUpdate(); // Trigger any necessary actions after successful update
        onCancel();
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label="Name"
        id="name"
        ref={firstFieldRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label="Price"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextInput
        label="Sold"
        id="sold"
        value={sold}
        onChange={(e) => setSold(e.target.value)}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleUpdate}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const Item = ({ id, name, price, sold, onUpdate,handleDelete }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = useRef();

  const handleEdit = () => {
    onOpen();
  };
  return (
    <DIV>
      <div id="left">
      <div>
        <Heading as={"h3"} size="lg">
          {name}
        </Heading>
      </div>
      <div>
        <Text>Sold: {sold}</Text>
      </div>
      <div>
        <Text>Rs.{price}</Text>
        {/* <Button onClick={handleEdit}>Edit</Button> */}
      </div>
      </div>
      <div id="popOver">
        <Popover
          isOpen={isOpen}
          initialFocusRef={initialFocusRef}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton size="sm" icon={<EditIcon />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <PopoverArrow />
            <PopoverCloseButton />
            <EditForm id={id} onCancel={onClose} onUpdate={onUpdate} />
          </PopoverContent>
        </Popover>
      </div>
      <div>
      <IconButton size="sm" icon={<DeleteIcon />} onClick={()=>{handleDelete(id)}}/>
      </div>
    </DIV>
  );
};

export default Item;

const DIV = styled.div`
display: flex;
justify-content: space-around;
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 1%;
  text-align: center;
  /* div {
    width: 30%;
    /* border: 1px solid red; */
  /* } */ */
  p {
    font-size: 18px;
  }
  #left{
    width: 70%;
    display: flex;
  justify-content: space-between;
  div{
    width: 33%;
    /* border: 1px solid red */
  }
  /* border: 1px solid red; */
  }
  #popOver{
    /* border: 1px solid red; */
  }
`;
