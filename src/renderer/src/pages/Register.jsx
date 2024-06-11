import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const registerValidator = yup.object().shape({
  username: yup.string().required('Nome de usuário obrigatório'),
  email: yup.string().email('Campo deve ser um e-mail').required('E-mail obrigatório'),
  password: yup.string().min(6, "No mínimo 6 dígitos").required("Campo obrigatório"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem corresponder').required('Confirmação de senha obrigatória')
}).required();

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerValidator),
  });
  const navigate = useNavigate();

  async function submit(values) {
    try {
      // Removendo confirmPassword antes de enviar para a API
      const { confirmPassword, ...dataToSend } = values;
      const response = await API.post('register', dataToSend);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response.data);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h4">Register</Typography>
      <TextField
        {...register('username')}
        label="Nome de usuário"
        type="text"
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        {...register('email')}
        label="E-mail"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        label="Senha"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        label="Confirme a Senha"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit" variant="contained">Registrar</Button>
      <Button variant="text" onClick={() => navigate('/login')}>
        Já tem uma conta? Faça login
      </Button>
    </Box>
  );
}

export default Register;
