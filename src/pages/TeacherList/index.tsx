/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeacher] = useState<Teacher[]>([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const { data } = await api.get('class', {
      params: { subject, week_day: weekday, time },
    });

    setTeacher(data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'portugues', label: 'Português' },
              { value: 'matematica', label: 'Matemática' },
              { value: 'biologia', label: 'Biologia' },
              { value: 'fisica', label: 'Física' },
              { value: 'quimica', label: 'Química' },
              { value: 'geografia', label: 'Geografia' },
              { value: 'historia', label: 'História' },
              { value: 'ingles', label: 'Inglês' },
              { value: 'informatica', label: 'Informática' },
            ]}
          />

          <Select
            name="week_day"
            label="Weekday"
            value={weekday}
            onChange={e => setWeekday(e.target.value)}
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
            name="time"
            label="Time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map(teacher => (
          <TeacherItem teacher={teacher} key={teacher.id} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
