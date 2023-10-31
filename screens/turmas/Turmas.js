import React from 'react'
import { Button, Text } from 'react-native-paper'

const Turmas = ({navigation}) => {
  return (
    <>
    <Text style={{ margin: 15 }}>Turmas</Text>
    <Button 
    icon='plus' 
    mode='contained'
    onPress={() => navigation.push('Turmas-form')}
    >Novo</Button>
    </>
  )
}

export default Turmas