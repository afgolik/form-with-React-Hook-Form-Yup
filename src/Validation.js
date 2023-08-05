import * as yup from 'yup';

yup.addMethod(yup.string, 'customValidate', function (message) {
	return this.test('custom-validate', message, function (value) {
		return value === this.parent.password;
	});
});
export const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
			'Неверный формат почты. Почта должна содержать символ @ и название домена. Пример правильной почты: user@email.ru',
		),
	password: yup
		.string()
		.matches(
			/^(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
			'Пароль должен содержать минимум 8 символов: строчные и прописные латинские буквы, цифры. Пробелы изпользовать запрещено',
		),
	repeatPassword: yup.string().customValidate('Пароли не совпадают'),
});
