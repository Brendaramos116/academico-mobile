import React from 'react'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import professorValidator from '../../validators/professorValidator'
import Validacao from '../../components/Validacao'
import { mask } from 'remask'

const ProfessoresForm = ({ navigation, route }) => {

  let professor = {
    nome: '',
    cpf:'',
    matricula: '',
    salario: '',
    email: '',
    telefone: '',
    cep: '',
    complemento: '',
    logradouro: '',
    numero: '',
    bairro: '',
  }

  const id = route.params?.id

  if(id >= 0){    
    professor = route.params?.professor
 }  

  function salvar(dados) {
    AsyncStorage.getItem('professores').then(resultado => {

      const professores = JSON.parse(resultado) || []

      if (id >= 0) {
        professores.splice(id, 1, dados)
      } else {
        professores.push(dados)
      }

      console.log(professores)

      AsyncStorage.setItem('professores', JSON.stringify(professores))

      navigation.goBack()
    })

  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>Fomulário Professores</Text>

        <Formik
          initialValues={professor}
          validationSchema={professorValidator}
          onSubmit={values => salvar(values)}
        >
          {({values, handleChange, handleSubmit, errors, touched, setFieldValue}) => (
            <View>
              <TextInput
                label='Nome'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.nome}
                onChangeText={handleChange('nome')}
              />
              <Validacao errors={errors.nome} touched={touched.nome} />

              <TextInput
                label='CPF'
                style={{ marginTop: 10 }}
                mode='outlined'
                keyboardType='decimal-pad'
                value={values.cpf}
                onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
              />
               <Validacao errors={errors.cpf} touched={touched.cpf} />

              <TextInput
                label='Matrícula'
                style={{ marginTop: 10 }}
                mode='outlined'
                keyboardType='decimal-pad'
                value={values.matricula}
                onChangeText={handleChange('matricula')}
              />
              <Validacao errors={errors.matricula} touched={touched.matricula} />

              <TextInput
                label='Salário'
                style={{ marginTop: 10 }}
                mode='outlined'
                keyboardType='decimal-pad'
                value={values.salario}
                onChangeText={handleChange('salario')}
              />
              <Validacao errors={errors.matricula} touched={touched.matricula} />
              <TextInput
                label='E-mail'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <Validacao errors={errors.email} touched={touched.email} />

              <TextInput
                label='Telefone'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.telefone}
                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
              />
              <Validacao errors={errors.telefone} touched={touched.telefone} />

              <TextInput
                label='CEP'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.cep}
                onChangeText={(value) => { setFieldValue('cep', mask(value, '99.999-999')) }}
              />
              <Validacao errors={errors.cep} touched={touched.cep} />

              <TextInput
                label='Logradouro'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.logradouro}
                onChangeText={handleChange('logradouro')}
              />
              <Validacao errors={errors.logradouro} touched={touched.logradouro} />

              <TextInput
                label='Complemento'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.complemento}
                onChangeText={handleChange('complemento')}
              />
              <Validacao errors={errors.complemento} touched={touched.complemento} />

              <TextInput
                label='Número'
                style={{ marginTop: 10 }}
                mode='outlined'       
                value={values.numero}
                onChangeText={handleChange('numero')}
              />
              <Validacao errors={errors.numero} touched={touched.numero} />

              <TextInput
                label='Bairro'
                style={{ marginTop: 10 }}
                mode='outlined'
                value={values.bairro}
                onChangeText={handleChange('bairro')}
              />
              <Validacao errors={errors.bairro} touched={touched.bairro} />

              <Button onPress={handleSubmit}>Salvar</Button>
            </View>
          )}
        </Formik>

      </ScrollView>

    </>
  )
}

export default ProfessoresForm