'use client';
import { Button } from '@obosbbl/grunnmuren-react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton(props) {
  const { pending } = useFormStatus();

  return <Button isPending={pending} type="submit" {...props} />;
}
