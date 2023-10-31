import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Alunos from './Alunos';
import AlunosForm from './AlunosForm';

const Stack = createNativeStackNavigator();
const AlunoStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="alunos" component={Alunos} options={{ title: 'Alunos' }} />
                <Stack.Screen name="alunos-form" component={AlunosForm} options={{ title: 'Aluno Formulário' }} />                
            </Stack.Navigator>
        </>
    )
}

export default AlunoStack