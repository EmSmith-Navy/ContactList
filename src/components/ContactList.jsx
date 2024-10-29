import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContactRow from "./ContactRow";

const dummyContacts = [
  { id: 1, name: "R2-D2", phone: "222-222-2222", email: "r2d2@droids.com" },
  { id: 2, name: "C-3PO", phone: "333-333-3333", email: "c3po@droids.com" },
  { id: 3, name: "BB-8", phone: "888-888-8888", email: "bb8@droids.com" },
];

export default function ContactList({ setSelectedContactId }) {
  const [contacts, setContacts] = useState(dummyContacts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const result = await response.json();
        setContacts(result);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContacts();
  }, []);

  if (error) return <div>Error loading contacts: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {contacts.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            setSelectedContactId={setSelectedContactId}
          />
        ))}
      </tbody>
    </table>
  );
}

ContactList.propTypes = {
  setSelectedContactId: PropTypes.func.isRequired,
};
