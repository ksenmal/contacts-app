import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" className="contact-form">
      <div>
        <label htmlFor="first">Name</label>
        <input type="text" id="first" name="first" defaultValue={contact.first} placeholder="First name" />
        <input type="text" name="last" defaultValue={contact.last} placeholder="Last name" />
      </div>
      <div>
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" name="twitter" defaultValue={contact.twitter} placeholder="@jack" />
      </div>
      <div>
        <label htmlFor="avatar">Avatar URL</label>
        <input type="text" id="avatar" name="avatar" defaultValue={contact.avatar} placeholder="https://example.com/avatar.jpg" />
      </div>
      <div>
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" cols="30" rows="6" defaultValue={contact.notes}></textarea>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </Form>
  );
}