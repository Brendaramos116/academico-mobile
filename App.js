import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CursoStack from './screens/cursos/CursoStack';
import DisciplinaStack from './screens/disciplinas/DisciplinaStack';
import AlunoStack from './screens/alunos/AlunoStack';
import ProfessorStack from './screens/professores/ProfessorStack';
import TurmaStack from './screens/turmas/TurmaStack';


const Tab = createMaterialBottomTabNavigator();
export default function App() {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="cursos"
              component={CursoStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="notebook-multiple" size={26} />)
              }}
            />
            <Tab.Screen
              name="disciplinas"
              component={DisciplinaStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="book-open-variant" size={26} />)
              }}
            />
            <Tab.Screen
              name="alunos"
              component={AlunoStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-circle-outline" size={26} />)
              }}
            />
            <Tab.Screen
              name="professores"
              component={ProfessorStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-tie" size={26} />)
              }}
            />
            <Tab.Screen
              name="turmas"
              component={TurmaStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="google-classroom" size={26} />)
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  )
}
