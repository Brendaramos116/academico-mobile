import React from 'react'
import * as Yup from 'yup';

const cursoValidator = Yup.object().shape({
  nome: Yup.string()
    .min(2, 'Valor muito curto')
    .max(50, 'Valor muito grande')
    .required('Campo obrigatório'),
  duracao: Yup.number()
    .required('Campo obrigatório'),
  modalidade: Yup.string()
    .required('Campo obrigatório'),
})

export default cursoValidator