import { useQuery } from '@apollo/client'
import { useError } from './hooks/index'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null
	}
	return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
	const result = useQuery(ALL_PERSONS)
	const [error, notify] = useError()

	if (result.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<Notify errorMessage={error} />
			<PersonForm setError={notify} />
			<Persons persons={result.data.allPersons} />
		</div>
	)
}

export default App
