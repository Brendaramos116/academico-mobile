import React from 'react'
import * as Yup from 'yup';

const professorValidator = Yup.object().shape({
  nome: Yup.string()
    .min(2, 'Valor muito curto')
    .max(50, 'Valor muito grande')
    .required('Campo obrigatório'),
    matricula: Yup.string()
    .required('Campo obrigatório'),
    salario: Yup.string()
    .required('Campo obrigatório'), 
    email: Yup.string()
    .email()
    .required('Campo obrigatório'),
    telefone:Yup.string()
    .required('Campo obrigatório'),
    cep: Yup.string()
    .required('Campo obrigatório'),
    logradouro: Yup.string()
    .required('Campo obrigatório'),
    numero: Yup.string()
    .required('Campo obrigatório'),
    bairro: Yup.string()
    .required('Campo obrigatório')
})

export default professorValidator
