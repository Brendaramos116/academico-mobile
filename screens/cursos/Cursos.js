import React, { useEffect, useState } from 'react'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const Cursos = ({ navigation }) => {

  const [cursos, setCursos] = useState([])

  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {

      carregarDados()

    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('cursos').then(resultado => {

      resultado = JSON.parse(resultado) || []
      console.log(resultado)

      setCursos(resultado)
    }, [])
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    cursos.splice(idExcluir, 1)
    AsyncStorage.setItem('cursos', JSON.stringify(cursos))
    carregarDados()
    setVisible(false)
  }


  return (
    <>
      <ScrollView style={{ padding: 15 }}>

        {cursos.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content >
              <Text variant='bodyMedium'>Nome: {item.nome}</Text>
              <Text>Duração: {item.duracao} sem.</Text>
              <Text>Modalidade: {item.modalidade}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('cursos-form', {id: i, curso: item})}
              />
              <IconButton
                icon='delete'
                onPress={() => confirmarExclusao(i)} />
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja realmente excluir o registro?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>

      <FAB
        icon='plus'
        size='small'
        style={{ position: 'absolute', right: 5, bottom: 5 }}
        onPress={() => navigation.push('cursos-form')}
      />
    </>
  )
}

export default Cursos