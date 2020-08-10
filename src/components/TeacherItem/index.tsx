import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher,
}: TeacherItemProps) => {
  // eslint-disable-next-line react/prop-types
  const { avatar, bio, cost, id, name, subject, whatsapp } = teacher;

  function createNewConnection() {
    api.post('connection', { user_id: teacher.id });
  }
  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={`Foto ${name}`} />
        <div>
          <strong>
            {name}
            {id}
          </strong>
          <span>{subject}</span>
        </div>
      </header>
      <p>{bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>
            R$
            {cost}
          </strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
