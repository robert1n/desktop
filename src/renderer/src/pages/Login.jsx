import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const loginValidator = yup.object().shape({
    email: yup.string().email('Campo deve ser um e-mail').required('E-mail obrigatório'),
    password: yup.string().min(6, "No mínimo 6 dígitos").required("Campo obrigatório"),
}).required();

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidator),
    });
    const navigate = useNavigate();

    async function submit(values) {
        try {
            const { data, status } = await API.post('login', values);
            console.log({ data, status });
            localStorage.setItem('token', data.token);
            navigate('/home');
        } catch (error) {
            console.error('Error response:', error.response);
            console.error('Error response data:', error.response.data);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(submit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', marginTop: '50px' }}>
            <Typography variant="h4">Login</Typography>
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
            <Button type="submit" variant="contained">Entrar</Button>
            <Button variant="text" onClick={() => navigate('/register')}>
                Não tem uma conta? Registre-se
            </Button>
        </Box>
    );
}

export default Login;
