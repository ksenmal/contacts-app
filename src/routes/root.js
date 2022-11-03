
import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useNavigation, Form, redirect, NavLink, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);
    return { contacts, q };
  } catch (error) {
    console.error('getContacts error: ', error);
    return { error };
  }
}

export async function action() {
  try {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  } catch (error) {
    console.error('createContact action error: ', error);
  }
}

export default function Root() {
  const { contacts, error, q } = useLoaderData();
  const [query, setQuery] = useState(q || '');
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    setQuery(q || '');
  }, [q]);

  function searchHandler(e) {
    const isFirstSearch = (q === '') || (q === null);
    setQuery(e.currentTarget.value);
    submit(e.currentTarget.form, {
      replace: !isFirstSearch
    });
  }
  
  return (
    <>
      <div className="sidebar">
        <h1>
          <Link to={'/'}>Contacts App</Link>
        </h1>
        <div>
          <Form id="search-form" role="search">
            <input type="search" id="q" name="q" 
              className={searching ? 'loading' : ''}
              value={query} onChange={searchHandler}
              aria-label="Search contacts" placeholder="Search" />
            <div className="search-spinner" hidden={!searching} aria-hidden></div>
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts && contacts.length ? (
            <ul>
              {contacts.map(contact => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`} className={({isActive, isPending}) => isActive ? 'active' : isPending ? 'pending' : ''}>
                    {contact.first || contact.last ? (
                      <>{contact.first} {contact.last}</>
                   
                    ) : <i>No name</i>}
                    {' '}
                    {contact.favourite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
          {contacts && !contacts.length ? (
            <p><i>No contacts</i></p>
          ) : null}
          {error && (
            <p><i>Couldn't get contacts</i></p>
          )}
        </nav>
      </div>
      <div className={navigation.state === 'loading' ? 'detail loading' : 'detail'}>
        <Outlet />
      </div>
    </>
  );
}