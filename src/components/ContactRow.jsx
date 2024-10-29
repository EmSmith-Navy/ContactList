import PropTypes from "prop-types";

export default function ContactRow({ contact, setSelectedContactId }) {
  return (
    <tr onClick={() => setSelectedContactId(contact.id)}>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
    </tr>
  );
}

ContactRow.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedContactId: PropTypes.func.isRequired,
};
