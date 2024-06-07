"use client";

import { validateContactForm } from "./actions";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

// FIXME: This is in the same file just for demo purposes. In a real project, this should be in a separate file.
// the useFormStatus hook get the context of the form status, so it needs to be called inside the form component
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-label="submit contact form" disabled={pending} type="submit" className="group relative w-full flex justify-center py-2 px-4 mt-16 border text-sm font-medium transition-colors text-primary-light hover:text-primary-dark bg-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light border-primary-dark dark:border-primary-light dark:text-primary-dark dark:hover:text-primary-light dark:bg-primary-light dark:hover:bg-primary-dark">
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

function Contact() {
  const [state, formAction] = useFormState(validateContactForm, { status: 200, data: { message: "" } });
  const formRef = useRef<HTMLFormElement>(null);

  // after successful submission, reset the form
  if (state.status === 200) {
    formRef.current?.reset();
  }

  return (
    <div className="mx-auto max-w-7xl my-32 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-title text-5xl md:text-7xl uppercase">Let&apos;s start a project together!</h1>

        <form ref={formRef} className="mt-8 space-y-6" action={formAction}>
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" className="appearance-none  relative block w-full px-3 py-2 border-b border-primary-dark dark:border-primary-light placeholder-gray-500 focus:outline-none focus:ring-primary-light focus:border-primary-light focus:z-10 sm:text-sm" placeholder="Name" />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border-b border-primary-dark dark:border-primary-light placeholder-gray-500 focus:outline-none focus:ring-primary-light focus:border-primary-light focus:z-10 sm:text-sm" placeholder="Email" />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea id="message" name="message" rows={4} className="appearance-none  relative block w-full px-3 py-2 border-b border-primary-dark dark:border-primary-light placeholder-gray-500 focus:outline-none focus:ring-primary-light focus:border-primary-light focus:z-10 sm:text-sm" placeholder="Message"></textarea>
          </div>

          {state.data.message && <p>{state.data.message}</p>}

          {state.data.errors && (
            <ul>
              {state.data.errors.map((error, i) => (
                <li key={i}>{error.path} - {error.message}</li>
              ))}
            </ul>
          )}

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;