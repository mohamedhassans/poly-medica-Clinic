import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Swal from 'sweetalert2';
import { authenticationAxios } from 'utils/AxiosConfig';


// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const { dispatch } = useUserContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const postData = { 'userName': userName, 'password': password };
		try{
			const response = await authenticationAxios.post('/login/clinic', postData);
			const data = response.data;		
			dispatch({ auth: true, payload:data });
			if(data.reset)
				navigate(`/${data.type}/pages/profile`);
			else
					navigate(`/${data.type}`);
			setIsSubmitting(false);
		} catch(err){
			
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.response.data.message,
			});
			setIsSubmitting(false);
			}
	};

	return (	
		<>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					<Box sx={{ mb: 2 }}>
						<Typography variant="subtitle1">Sign in with username address</Typography>
					</Box>
				</Grid>
			</Grid>
					<form onSubmit={handleSubmit}>
						<FormControl fullWidth required sx={{ marginBottom:3 }}>
							<TextField
							type='text'
							required
							label="username"
							value={userName}
							onChange={e => setUserName(e.target.value)}
							title='AuthLoginTextFieldUserName'
							/>
						</FormControl>

						<FormControl fullWidth required>
							<TextField
							type={'password'}
							label="password"
							value={password}
							required
							onChange={e => setPassword(e.target.value)}
							title='AuthLoginTextFieldPassword'
							/>
						</FormControl>
						<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
							<Typography data-testid="AuthLoginTypographyForgotPassword" onClick={ () => { navigate('/login/reset-password'); } } variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
								Forgot Password?
							</Typography>
						</Stack>
						<Box sx={{ mt: 2 }}>
							<AnimateButton>
								<Button title='AuthLoginButtonSignIn' disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
								</Button>
							</AnimateButton>
						</Box>
					</form>
		</>
	);
};

export default FirebaseLogin;
