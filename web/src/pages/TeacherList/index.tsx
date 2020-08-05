import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'

const TeacherList = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(event: FormEvent) {
        event.preventDefault()

        const params = {
            subject,
            week_day,
            time
        }

        try {
            const { data } = await api.get('classes', { params })
            setTeachers(data)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div id='page-teacher-list' className='container'>
            <PageHeader title='Esses são os Proffys disponíveis.'>
                <form id='search-teachers' onSubmit={searchTeachers}>
                    <Select
                        name='subject'
                        label='Matéria'
                        value={subject}
                        onChange={event => { setSubject(event.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'História', label: 'História' },
                        ]}
                    />
                    <Select
                        name='week-day'
                        label='Dia da semana'
                        value={week_day}
                        onChange={event => { setWeekDay(event.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input
                        type='time'
                        name='time'
                        label='Hora'
                        value={time}
                        onChange={event => { setTime(event.target.value) }}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map(teacher => (
                        <TeacherItem key={teacher.id} teacher={teacher} />
                    ))
                }
            </main>
        </div>
    )
}

export default TeacherList
