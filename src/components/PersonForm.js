import { useMutation } from '@apollo/client'
import { useField } from '../hooks/index'
import { CREATE_PERSON, ALL_PERSONS } from '../queries'

const PersonForm = ({ setError }) => {
	const { reset: resetName, ...name } = useField('text')
	const { reset: resetPhone, ...phone } = useField('text')
	const { reset: resetStreet, ...street } = useField('text')
	const { reset: resetCity, ...city } = useField('text')

	const [createPerson] = useMutation(CREATE_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
		onError: error => {
			setError(error.graphQLErrors[0].message)
		},
	})

	const submit = event => {
		event.preventDefault()

		createPerson({
			variables: {
				name: name.value,
				phone: phone.value,
				street: street.value,
				city: city.value,
			},
		})

		resetName()
		resetPhone()
		resetStreet()
		resetCity()
	}
	return (
		<div>
			<h2>add new</h2>
			<form onSubmit={submit}>
				<div>
					name <input {...name} />
				</div>
				<div>
					phone <input {...phone} />
				</div>
				<div>
					street <input {...street} />
				</div>
				<div>
					city <input {...city} />
				</div>
				<button type='submit'>add!</button>
			</form>
		</div>
	)
}

export default PersonForm
