import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Disciplinas from './Disciplinas';
import DisciplinasForm from './DisciplinasForm';

const Stack = createNativeStackNavigator();
const DisciplinaStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Disciplinas" component={Disciplinas} options={{ title: 'Disciplinas' }} />
                <Stack.Screen name="Disciplinas-form" component={DisciplinasForm} options={{ title: 'Disciplina Formulário' }} />
            </Stack.Navigator>
        </>
    )
}

export default DisciplinaStack