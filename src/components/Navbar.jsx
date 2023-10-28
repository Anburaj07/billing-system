import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <DIV>
        <Link to='/'>Billing System</Link>
        <Link to='/add-bill'>Add Bill</Link>
    </DIV>
  )
}

export default Navbar

const DIV=styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    width: 100%;
    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% );
    font-size: 20px;
    font-weight: bold;
    a{
        text-decoration: none;
    }
`