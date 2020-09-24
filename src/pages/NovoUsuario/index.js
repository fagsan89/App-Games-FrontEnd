import React, { useState } from 'react';
import  api  from '../../services/api'
//import { Link } from "react-router-dom";

import {Container,Form,ButtonLogin} from './styles'
import Logo from "../../assets/react.svg";

// import { Container } from './styles';

function Cadastro(props) {

  const [dadosForm, setDadosForm] = useState({
    name:'',
    email:'',
    password:''
  })

  async function handleSubmit() {
    
    await api.post(`/usuario/cadastrar`, dadosForm)
    .then(resp =>{
      //props.history.push("/app")
      window.location.href = '/app'
    })
    .catch(err =>{
      console.log('ERROR',err)
    })
  }


  function handleChange(event){
    setDadosForm({...dadosForm,
      [event.target.name] : event.target.value
    })
  }

  return(

    <Container>
        <Form >
          <img src={Logo} alt="logo" />

          <input
            name="name"
            type="text"
            placeholder="Nome de Usuário"
            onChange={handleChange}
            value={dadosForm.name}
            autoComplete="off"
          />
         
          <input
            name="email"
            type="email"
            placeholder="Endereço de e-mail"
            onChange={handleChange}
            value={dadosForm.email}
            autoComplete="off"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            value={dadosForm.password}
            autoComplete="off"
          />
          <ButtonLogin onClick={handleSubmit}>Cadastrar</ButtonLogin>
        </Form>
  </Container>

  )
}

export default Cadastro;