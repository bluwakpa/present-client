import React, { useState, useContext } from 'react';
// import App from './App';
// import data from './data';
import { Link } from 'react-router-dom';
// import Attendance from './Attendance';
import PresentForm from './PresentForm';
import ApiContext from './ApiContext'

export default function AddPeriod(props) {
    const context = useContext(ApiContext)
    const init = {
        period: ""
    }
    const [formData, setFormData] = useState(init)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.period]: e.target.value
        })
    }
    const onSubmit = (e) => {
        {/* insert fetch and then for db */ }
        e.preventDefault()
        const newPeriod = {
            period: parseInt(formData.period),
        }
        context.setPeriods([...context.periods, newPeriod])
        props.history.push(`/attendance/${formData.period}`)
    }
    AddPeriod.defaultProps = {
        history: {
            push: () => { }
        },
    }

    const handleSubmit = e => {
        e.preventDefault()
        const period = {
            name: e.target['period-number'].value
        }
    }

    return (
        <main role="main">
            <header role="banner">
                <h2>Select Period</h2>
            </header>
            <PresentForm onSubmit={handleSubmit}>
                <form>
                    {
                        context.periods.map(period => (
                            <div>
                                <Link to={`/attendance/${period.period}`}>
                                    <button type='submit'>
                                        <span>Classroom Period {period.period}</span>
                                    </button>
                                </Link>
                            </div>
                        ))
                    }
                    <div className="container-fluid">
                        <Link to={`/attendance/${period.period}`}>
                            <section className="button-section">
                                <span className="custom-dropdown big">
                                    <select type='submit' value={formData.period} name='period' onChange={handleChange} onSubmit={onSubmit}>
                                        <option value=""> Add Classroom Period </option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                    </select>
                                </span>
                            </section>
                        </Link>
                    </div>
                </form>
            </PresentForm>
        </main>
    );
}