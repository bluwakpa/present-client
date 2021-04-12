import React, { useState, useContext } from 'react';
import ApiContext from './ApiContext';
import { Link } from 'react-router-dom'

export default function StudentsHistory(props) {
    const [value, onChange] = useState(new Date());
    const context = useContext(ApiContext);
    const student = context.students
    console.log('student.attendance', student.attendance)
    const students = context.students;

    console.log('student', student)

    const listItems = students.map((student) =>
        <StudentsHistory key={student.toString()}
            value={student} />
    );
    console.log('listItems', listItems)


    return (
        <main role="main">
            <header role="banner">
                <h2>Students History</h2>
                <h3>
                    {student.first_name} {student.last_name} <br />
                </h3>
                <div>
                    {
                        Object.entries(student.attendance).map(([date, present]) => (
                            <div>
                                <p>{date}</p>
                                <p>{present ? "Present" : "Absent"}</p>
                            </div>
                        ))
                    }
                </div>
            </header>
            <section className="button-section">
                <Link to="/attendance"><button> Attendance </button></Link>
            </section>
        </main>
    );
}