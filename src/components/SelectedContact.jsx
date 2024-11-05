import { useState, useEffect } from "react";

export default function SelectedContact({
  selectedContactId,
  setSelectedContactId,
}) {
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const data = await response.json();
        console.log("Fetched contact:", data);
        setContact(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch contact details");
      } finally {
        setIsLoading(false);
      }
    }
    fetchContact();
  }, [selectedContactId]);

  if (isLoading) return <div>Loading contact details...</div>;
  if (error) return <div>{error}</div>;
  if (!contact) return <div>No contact found</div>;

  return (
    <div className="selected-contact">
      <button onClick={() => setSelectedContactId(null)}>
        Back to Contact List
      </button>
      <h2>{contact.name}</h2>
      <div>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Username: {contact.username}</p>
        <p>Website: {contact.website}</p>
        <h3>Address:</h3>
        <p>
          {contact.address.street}, {contact.address.suite}
        </p>
        <p>
          {contact.address.city}, {contact.address.zipcode}
        </p>
        <h3>Company:</h3>
        <p>{contact.company.name}</p>
        <p>{contact.company.catchPhrase}</p>
      </div>
    </div>
  );
}

SelectedContact.propTypes;
