import { useQuery } from '@apollo/client'
import { useError } from './hooks/index'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './queries'

const App = () => {
	const result = useQuery(ALL_PERSONS)
	const [error, notify] = useError()

	if (result.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<Notify errorMessage={error} />
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
		</div>
	)
}

export default App
