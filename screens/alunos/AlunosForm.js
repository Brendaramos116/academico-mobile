import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import { mask } from 'remask'
import alunoValidator from '../../validators/alunoValidator'

const AlunosForm = ({ navigation, route }) => {

  let aluno = {
    nome: '',
    cpf: '',
    matricula: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
  }

  const id = route.params?.id

  if (id >= 0) {
    aluno = route.params?.aluno
  }

  function salvar(dados) {
    AsyncStorage.getItem('alunos').then(resultado => {

      const alunos = JSON.parse(resultado) || []

      if (id >= 0) {
        alunos.splice(id, 1, dados)
      } else {
        alunos.push(dados)
      }

      console.log(alunos)

      AsyncStorage.setItem('alunos', JSON.stringify(alunos))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>Fomulário Alunos</Text>
        <Formik
          initialValues={aluno}
          validationSchema={alunoValidator}
          onSubmit={values => salvar(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
            <View>
              <TextInput
                label='Nome'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.nome}
                onChangeText={handleChange('nome')}
              />

              {(errors.nome && touched.nome) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.nome}
                </Text>
              }

              <TextInput
                label='CPF'
                style={{ marginTop: 10 }}
                mode='outlined'
                keyboardType='decimal-pad'
                value={values.cpf}
                onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
              />

              {(errors.cpf && touched.cpf) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.cpf}
                </Text>
              }
              <TextInput
                label='Matrícula'
                style={{ marginTop: 10 }}
                mode='outlined'
                keyboardType='decimal-pad'
                value={values.matricula}
                onChangeText={handleChange('matricula')}
              />

              <TextInput
                label='E-mail'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.email}
                onChangeText={handleChange('email')}
              />

              <TextInput
                label='Telefone'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.telefone}
                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
              />

              <TextInput
                label='CEP'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.cep}
                onChangeText={(value) => { setFieldValue('cep', mask(value, '99.999-999')) }}
              />

              <TextInput
                label='Logradouro'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.logradouro}
                onChangeText={handleChange('logradouro')}
              />

              <TextInput
                label='Complemento'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.complemento}
                onChangeText={handleChange('complemento')}
              />

              <TextInput
                label='Número'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.numero}
                onChangeText={handleChange('numero')}
              />

              <TextInput
                label='Bairro'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.bairro}
                onChangeText={handleChange('bairro')}
              />

              <Button onPress={handleSubmit}>Salvar</Button>
            </View>
          )}
        </Formik>
      </ScrollView>

    </>
  )
}

export default AlunosForm