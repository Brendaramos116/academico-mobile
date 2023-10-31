import React, { useState } from 'react'
import { Button, Text, TextInput } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import cursoValidator from '../../validators/cursoValidator'
import { Picker } from '@react-native-picker/picker'


const CursosForm = ({ navigation, route }) => {

  let curso = {
    nome: '',
    duracao: '',
    modalidade: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    curso = route.params?.curso
  }

  function salvar(dados) {

    AsyncStorage.getItem('cursos').then(resultado => {

      const cursos = JSON.parse(resultado) || []

      if (id >= 0) {
        cursos.splice(id, 1, dados)
      } else {
        cursos.push(dados)
      }

      console.log(cursos)

      AsyncStorage.setItem('cursos', JSON.stringify(cursos))

      navigation.goBack()
    })

  }


  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>Fomulário Cursos</Text>

        <Formik
          initialValues={curso}
          validationSchema={cursoValidator}
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
                label='Duração'
                style={{ marginTop: 10 }}
                mode='outlined'
                keyboardType='decimal-pad'
                value={values.duracao}
                onChangeText={handleChange('duracao')}
              />

              {(errors.duracao && touched.duracao) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.duracao}
                </Text>
              }

              <Picker
                style={{ marginTop: 10 }}
                selectedValue={values.modalidade}
                onValueChange={handleChange('modalidade')}>
                <Picker.Item label="Modalidade" value="" />
                <Picker.Item label="Presencial" value="Presencial" />
                <Picker.Item label="EAD" value="EAD" />
                <Picker.Item label="Híbrido" value="Híbrido" />
              </Picker>

              {(errors.modalidade && touched.modalidade) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.modalidade}
                </Text>
              }

              <Button onPress={handleSubmit}>Salvar</Button>
            </View>
          )}
        </Formik>

      </ScrollView>
    </>
  )
}

export default CursosForm