import { Button, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import  useSignIn  from '../hooks/useSignIn';
import * as yup from 'yup';
import { useNavigate } from "react-router-native";

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{backgroundColor: "white"}}>
      <View style={{margin: 15}}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
          <Button title="Sign in" onPress={onSubmit} style={{margin:10, padding:10}} />
      </View>
    </View>
  )
}

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: ""
  }

  const onSubmit = async (values) => {
    const { username, password} = values;

    try {
       const { data } = await signIn({username, password})
       console.log(data)
      navigate.push("/")
    } catch(e){
      console.log(e)
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>{({ handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}</Formik>
  )
};

export default SignIn;