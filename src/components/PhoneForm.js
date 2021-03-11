import { useField } from '../hooks/index'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = () => {
	const { reset: resetName, ...name } = useField('text')
	const { reset: resetPhone, ...phone } = useField('text')

	const [changeNumber] = useMutation(EDIT_NUMBER)

	const submit = event => {
		event.preventDefault()

		changeNumber({ variables: { name: name.value, phone: phone.value } })

		resetName()
		resetPhone()
	}
	return (
		<div>
			<h2>change number</h2>
			<form onSubmit={submit}>
				<div>
					name <input {...name} />
				</div>
				<div>
					phone <input {...phone} />
				</div>
				<button type='submit'>change number</button>
			</form>
		</div>
	)
}

export default PhoneForm
