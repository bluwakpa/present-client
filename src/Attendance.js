import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data';
import ApiContext from './ApiContext';
import StudentAttendance from './StudentAttendance'

export default function Attendance(props) {
    const context = useContext(ApiContext)
    const [checked, setChecked] = useState({});
    const updateStudents = (newStudent) => {
        const index = context.students.indexOf(newStudent)
        context.students[index] = newStudent
        context.setStudents([...context.students])
        props.history.push(`/students-history`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedStudents = context.students.map(student => {
            student.attendance["2021-01-03"] = checked[student.id] || false
            return student
        })
        context.setStudents(updatedStudents)
        props.history.push(`/students-history`)
    }


    return (
        <main role="main">
            <header>
                <h2>Student Attendance</h2>
            </header>
            <article className="form-section">
                <label className="dream-date-label" htmlFor="date-month">Date: {data.date} </label>
            </article>
            <form onSubmit={handleSubmit}>
                {/* student names Link to EditStudent 
                    check attendance by clicking name
                    hover and focus
                    add class to show its selected
                    add pencil to left of name to edit student
                    accessibility by altering setCheck w CSS to view as button*/}
                {
                    context.students.map((student) => {
                        return <StudentAttendance checked={checked[student.id]} setChecked={(isChecked) => setChecked({ ...checked, [student.id]: isChecked })} student={student} updateStudents={updateStudents} />
                    })
                }
                {/* submit the attendance to student data */}
            </form>
            <section className="button-section">
                <Link to="/students-history"><button type="submit">Submit</button></Link>
                <br />
                <Link to="/add-student"><button>+ Student </button></Link>
            </section>
        </main>
    );
}