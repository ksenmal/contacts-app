import { useFetcher } from "react-router-dom";

export default function Favourite(props) {
  const { contact } = props;
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <button type="submit" name="favourite" value={contact.favourite ? 'false' : 'true'} className={fetcher.state !== 'idle' ? 'loading' : ''}>{contact.favourite ? '★' : '☆'}</button>
    </fetcher.Form>
  );
}