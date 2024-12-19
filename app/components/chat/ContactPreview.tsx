import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootRoomState } from '../../features/room/types';
import ContactPerson from './ContactPerson';

const ContactPreview: React.FC<{ data: any; image: any }> = ({
  data,
  image,
}) => {
  const [user, setUser] = useState(data);
  const { filteredConversations } = useSelector(
    (store: RootRoomState) => store.Room
  );
  const email = data.email;

  return (
    <ContactPerson
      style={{ marginTop: 7 }}
      type='contact'
      user={user}
      image={image}
      time={data.createdAt}
      room={filteredConversations.find((room: any) =>
        room.participantsArray.includes(email)
      )}
    />
  );
};

export default ContactPreview;
