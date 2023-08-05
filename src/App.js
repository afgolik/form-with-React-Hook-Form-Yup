import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useEffect, useRef } from 'react';
import { fieldsSchema } from './Validation';

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		setFocus,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onBlur',
	});
	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;
	const submitButtonRef = useRef(null);
	const sendFormData = (formData) => {
		console.log(formData);
		reset();
	};
	useEffect(() => submitButtonRef.current.focus());
	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(sendFormData)}>
				<input placeholder='Введите email' {...register('email')} />
				{emailError && <div className={styles.error}>{emailError}</div>}
				<input
					type='password'
					name='password'
					placeholder='Придумайте пароль'
					{...register('password')}
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<input
					type='password'
					placeholder='Повторите пароль'
					{...register('repeatPassword')}
				/>
				{repeatPasswordError && (<div className={styles.error}>{repeatPasswordError}</div>)}
				<button
					ref={submitButtonRef}
					disabled={!isValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
