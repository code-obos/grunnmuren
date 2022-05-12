import { useState } from 'react';
import { Snackbar, SnackbarContent } from '../';
import { Button } from '../..';

const metadata = {
  title: 'Snackbar',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

const pageNotifications = [
  {
    id: 'b57cf5e3-57b7-4ac0-8c83-7e2f242055f7',
    heading: 'OBOS bidrar – dette er våre tiltak',
    intro: '',
    content:
      '<p>Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte.</p>\n<p><a href="https://www.obos.no/corona">Dette er v&aring;re tiltak</a></p>',
  },
  {
    id: 'a47a5890-9a48-4302-b1a3-edf54d9b9997',
    heading:
      'Snackbar heading that is really long and should be truncated when snackbar is closed',
    intro: '',
    content:
      '<p>Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte.</p>\n<p><a href="https://www.obos.no/corona">Dette er v&aring;re tiltak</a></p>',
  },
];

const pageNotificationsWithOwnContent = [
  {
    id: 'a47a5890-9a48-4302-b1a3-edf54d9b9297',
    heading: 'Snackbar heading med egendefinert content',
    intro: '',
    content:
      'Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte.',
  },
];

export const Default = () => {
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);

  return (
    <div className="grid gap-2">
      {pageNotifications
        .filter((n) => !dismissedAlertIds.includes(n.id))
        .map((notification) => (
          <Snackbar
            id={notification.id}
            key={notification.id}
            heading={notification.heading}
            closeSnackbar={() =>
              setDismissedAlertIds([...dismissedAlertIds, notification.id])
            }
          >
            <SnackbarContent
              dangerouslySetInnerHTML={{ __html: `${notification.content}` }}
            />
          </Snackbar>
        ))}
      <Button onClick={() => setDismissedAlertIds([])}>Reset snackbars</Button>
    </div>
  );
};

export const SnackbarWithContent = () => {
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);

  return (
    <div className="grid gap-2">
      {pageNotificationsWithOwnContent
        .filter((n) => !dismissedAlertIds.includes(n.id))
        .map((notification) => (
          <Snackbar
            id={notification.id}
            key={notification.id}
            heading={notification.heading}
            closeSnackbar={() =>
              setDismissedAlertIds([...dismissedAlertIds, notification.id])
            }
          >
            <SnackbarContent>
              <p>{notification.content}</p>
            </SnackbarContent>
          </Snackbar>
        ))}
      <Button onClick={() => setDismissedAlertIds([])}>Reset snackbars</Button>
    </div>
  );
};
