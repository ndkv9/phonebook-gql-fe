import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_PERSON } from '../queries'

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		setValue(event.target.value)
	}

	const reset = () => {
		setValue('')
	}

	return { type, value, onChange, reset }
}

export const usePerson = () => {
	const [person, setPerson] = useState(null)
	const [getPerson, result] = useLazyQuery(FIND_PERSON)

	const showPerson = name => {
		getPerson({ variables: { nameToSearch: name } })
	}

	useEffect(() => {
		if (result.data) {
			setPerson(result.data.findPerson)
		}
	}, [result])

	const resetPerson = () => setPerson(null)

	return { person, showPerson, resetPerson }
}
