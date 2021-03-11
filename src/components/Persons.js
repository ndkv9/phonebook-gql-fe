import { usePerson } from '../hooks/index'

const Person = ({ person, reset }) => {
	return (
		<div>
			<h2>{person.name}</h2>
			<div>
				{person.address.street} {person.address.city}
			</div>
			<div>{person.phone}</div>
			<button onClick={() => reset()}>close</button>
		</div>
	)
}

const Persons = ({ persons }) => {
	const { person, showPerson, resetPerson } = usePerson()

	if (person) {
		return <Person person={person} reset={resetPerson} />
	}

	return (
		<div>
			<h2>Persons</h2>
			{persons.map(p => (
				<div key={p.name}>
					{p.name} {p.phone}
					<button onClick={() => showPerson(p.name)}>show address</button>
				</div>
			))}
		</div>
	)
}

export default Persons
