"use client";

import { validateContactForm } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

function Contact() {
  const [state, formAction] = useFormState(validateContactForm, { status: 200, data: { message: "" } });
  const { pending } = useFormStatus();

  return (
    <div className="mx-auto max-w-7xl px-4 my-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-title text-7xl uppercase">Let&apos;s start a project together!</h1>

        <form className="mt-8 space-y-6" action={formAction}>
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
            <button disabled={pending} type="submit" className="group relative w-full flex justify-center py-2 px-4 mt-16 border border-transparent text-sm font-medium transition-colors text-primary-light hover:text-primary-dark bg-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light border-primary-dark dark:border-primary-light">
              {pending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;;