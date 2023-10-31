import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import disciplinaValidator from '../../validators/disciplinaValidator'

const DisciplinasForm = ({ navigation, route }) => {
  let curso = {
    nome: '',
    curso_id: '',
  }

  const [cursos, setCursos] = useState([])

  if (id >= 0) {
    disciplina = route.params?.disciplina
  }

  useEffect(() => {
    AsyncStorage.getItem('cursos').then(resultado => {

      resultado = JSON.parse(resultado) || []

      setCursos(resultado)
    })
  }, [])
  const id = route.params?.id

  

  function salvar(dados) {
    AsyncStorage.getItem('disciplinas').then(resultado => {

      const disciplinas = JSON.parse(resultado) || []

      if (id >= 0) {
        disciplinas.splice(id, 1, dados)
      } else {
        disciplinas.push(dados)
      }

      console.log(disciplinas)

      AsyncStorage.setItem('disciplinas', JSON.stringify(disciplinas))

      navigation.goBack()
    })
  }

  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text>Fomulário Disciplina</Text>

        <Formik
          initialValues={curso}
          validationSchema={disciplinaValidator}
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

              <Picker
                style={{ marginTop: 10 }}
                selectedValue={values.curso_id}
                onValueChange={handleChange('curso_id')}>
                <Picker.Item label="Curso" value="" />
                {cursos.map((item, i) => (
                  <Picker.Item key={i}
                    label={item.nome}
                    value={item.nome} />
                ))}
              </Picker>

              {(errors.curso_id && touched.curso_id) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.curso_id}
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

export default DisciplinasForm