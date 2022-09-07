import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

const PatientFilters = ({ filters, onApply }) => {
    const [search, setSearch] = useState(filters.search);

    const handleChangeSearch = (e, data) => {
        setSearch(data.value)
    }

    const handleApply = () => {
        onApply({ search })
    }

    return (
        <Input onChange={handleChangeSearch} action={{color: 'teal', content: 'Search', icon: 'search', onClick: handleApply}} fluid icon='users' iconPosition='left' placeholder='Search users...' />
    )
}
export default PatientFilters;