/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

const proffys = [
  {
    avatar:
      'https://avatars0.githubusercontent.com/u/896631?s=460&u=2c2ba5a6399806ecacf9b475846d123ceaf16769&v=4',
    bio: 'Uma descrição',
    cost: 20,
    id: 123,
    name: 'Jezmael',
    subject: 'Informática',
    whatsapp: 'https://google.com',
  },
  {
    avatar:
      'https://avatars0.githubusercontent.com/u/896631?s=460&u=2c2ba5a6399806ecacf9b475846d123ceaf16769&v=4',
    bio: 'Uma descrição',
    cost: 20,
    id: 13,
    name: 'Jezmael B',
    subject: 'Informática',
    whatsapp: 'https://google.com',
  },
];

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" name="subject" id="subject" />
          </div>
          <div className="input-block">
            <label htmlFor="week_day">Dia da Semana</label>
            <input type="text" name="week_day" id="week_day" />
          </div>
          <div className="input-block">
            <label htmlFor="time">Horas</label>
            <input type="text" name="time" id="time" />
          </div>
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {proffys.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
