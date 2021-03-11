import { useField } from '../hooks/index'
import { useEffect } from 'react'
import { useError } from '../hooks/index'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = () => {
	const { reset: resetName, ...name } = useField('text')
	const { reset: resetPhone, ...phone } = useField('text')

	const [changeNumber, result] = useMutation(EDIT_NUMBER)
	const [error, notify] = useError()

	const submit = event => {
		event.preventDefault()

		changeNumber({ variables: { name: name.value, phone: phone.value } })

		resetName()
		resetPhone()
	}

	useEffect(() => {
		if (result.data && result.data.editNumber === null) {
			notify('person not found')
		}
	}, [result.data, notify])
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
