import { gql, useMutation } from '@apollo/client'
import { useField } from '../hooks/index'

const CREATE_PERSON = gql`
	mutation createPerson(
		$name: String!
		$street: String!
		$city: String!
		$phone: String
	) {
		addPerson(name: $name, street: $street, city: $city, phone: $phone) {
			name
			phone
			id
			address {
				street
				city
			}
		}
	}
`

const PersonForm = () => {
	const { reset: resetName, ...name } = useField('text')
	const { reset: resetPhone, ...phone } = useField('text')
	const { reset: resetStreet, ...street } = useField('text')
	const { reset: resetCity, ...city } = useField('text')

	const [createPerson] = useMutation(CREATE_PERSON)

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
