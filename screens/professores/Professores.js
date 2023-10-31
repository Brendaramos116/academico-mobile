import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'

const Professores = ({ navigation }) => {

  const [professores, setProfessores] = useState([])

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
    AsyncStorage.getItem('professores').then(resultado => {

      resultado = JSON.parse(resultado) || []
      console.log(resultado)

      setProfessores(resultado)
    },[])
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    professores.splice(idExcluir, 1)
    AsyncStorage.setItem('professores', JSON.stringify(professores))
    carregarDados()
    setVisible(false)
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>

        {professores.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content >
              <Text variant='bodyMedium'>Nome: {item.nome}</Text>
              <Text>CPF: {item.cpf} </Text>
              <Text>Matrícula: {item.matricula} </Text>
              <Text>Salário: {item.salario} </Text>
              <Text>E-mail: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>CEP: {item.cep}</Text>
              <Text>Logradouro: {item.logradouro}</Text>
              <Text>Complemento: {item.complemento}</Text>
              <Text>Número: {item.numero}</Text>
              <Text>Bairro: {item.bairro}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('Professores-form', { id: i, professor: item })}
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
        onPress={() => navigation.push('Professores-form')}
      />
    </>
  )
}
export default Professores