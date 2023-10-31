import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Turmas from './Turmas';
import TurmasForm from './TurmasForm';

const Stack = createNativeStackNavigator();
const TurmaStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Turmas" component={Turmas} options={{ title: 'Turmas' }} />
                <Stack.Screen name="Turmas-form" component={TurmasForm} options={{ title: 'Turma Formulário' }} />
            </Stack.Navigator>
        </>
    )
}

export default TurmaStack