import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

interface ScheduleItem {
  week_day?: number;
  from?: string;
  to?: string;
}

const TeacherForm: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([{}]);

  const history = useHistory();

  function addScheduleItem() {
    setScheduleItems([...scheduleItems, {}]);
  }

  function setScheduleItemValue(idx: number, field: string, value: string) {
    const newScheduleItems = scheduleItems.map((item, itemIdx) => {
      if (itemIdx === idx) {
        return { ...item, [field]: value };
      }

      return scheduleItems[itemIdx];
    });

    setScheduleItems(newScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    api
      .post('class', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedules: scheduleItems,
      })
      .then(() => {
        alert('Sign up sucess');
        history.push('/');
      })
      .catch(() => {
        alert('Sign up error');
      });
  }

  return (
    <div id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Personal info</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Classes</legend>

            <Select
              name="subject"
              label="Matéria"
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
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <Input
              name="cost"
              label="Custo da sua aula por hora"
              value={cost}
              onChange={e => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              <span>Horários disponíveis</span>
              <button type="button" onClick={addScheduleItem}>
                + Adicionar novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, idx) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e =>
                    setScheduleItemValue(idx, 'week_day', e.target.value)
                  }
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
                  name="from"
                  label="Horário inicial"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e =>
                    setScheduleItemValue(idx, 'from', e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Horário final"
                  type="time"
                  value={scheduleItem.to}
                  onChange={e =>
                    setScheduleItemValue(idx, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
