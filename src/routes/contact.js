import { Form, useLoaderData, useNavigate } from "react-router-dom";
import Favourite from "../components/Favourite";
import { getContact, updateContact } from "../contacts";
import avatar from '../avatar.png';

export async function loader({ params }) {
  try {
    const contact = await getContact(params.contactId);
    return { contact };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favourite: formData.get('favourite') === 'true'
  });
}

export default function Contact() {
  const { contact, error } = useLoaderData();
  const navigate = useNavigate();

  function goToEditPage() {
    navigate(`edit`);
  }

  return (
    <>
      {contact && (
        <div className="contact">
          <div>
            {contact.avatar && <img src={contact.avatar || null} alt="Contact avatar" />}
            {!contact.avatar && <div className="empty-img">
                <img src={avatar} alt="Contact avatar" />
              </div>
            }
          </div>

          <div>
            <h1>
              {contact.first || contact.last ? <span>{contact.first} {contact.last}</span> : <i>No name</i>}
              {' '}
              <Favourite contact={contact} />
            </h1>

            {contact.twitter && <p>
              <a target="_blank" rel="noreferrer" href={`https://twitter.com/${contact.twitter}`}>{contact.twitter}</a>  
            </p>}

            {contact.notes && <p>{contact.notes}</p>}

            <div>
              <form>
                <button type="button" onClick={goToEditPage}>Edit</button>
              </form>
              <Form method="post" action="delete" onSubmit={event => {
                if (!window.confirm('Please confirm you want to delete this contact.')) {
                  event.preventDefault();
                }
              }}>
                <button type="submit">Delete</button>
              </Form>
            </div>
          </div>
        </div>
      )}
      {(!contact || error) && (
        <p><i>Couldn't get an info about selected contact</i></p>
      )}
    </>
  );
}