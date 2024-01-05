'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@obosbbl/grunnmuren-react';

export default function SubmitButton(props) {
  const { pending } = useFormStatus();

  return <Button isLoading={pending} type="submit" {...props} />;
}
