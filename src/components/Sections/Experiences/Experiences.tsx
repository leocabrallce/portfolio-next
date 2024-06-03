// TODO: Refactor this component to be a client component
/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid";
import { sdk } from "@/lib/graphql-request";
import { SortOrder } from "@/graphql/types";
import moment from "moment";

async function Experiences() {
  const getAllExperiences = await sdk.GetAllExperiences({ sort: [{ startDate: SortOrder.Desc }] });
  const experiences = getAllExperiences.data.allExperience;

  return (
    <section>
      <h2 className="font-title uppercase my-24 text-6xl">
        Experiences
      </h2>

      <dl className="mt-10 space-y-6 divide-y divide-primary-dark/10">
        {experiences.map((experience) => (
          <Disclosure as="div" key={experience._id} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <DisclosureButton className="flex w-full items-start justify-between text-left text-primary-dark">
                    <div className="grid grid-cols-4 w-full">
                      <span className="leading-5 text-2xl uppercase">{experience.company}</span>
                      <span className="text-lg">{moment(experience.startDate).format("MMM YYYY")} - {experience.endDate ? moment(experience.endDate).format("MMM YYYY") : "Present"}</span>
                      <span className="text-lg">{experience.location}</span>
                      <span className="text-lg">{experience.title}</span>
                    </div>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </DisclosureButton>
                </dt>
                <Transition
                  enter="duration-200 ease-out"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="duration-300 ease-out"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <div className="grid grid-cols-1 sm:grid-cols-4 my-16">
                      <p className="text-lg leading-6 text-primary-dark sm:col-start-2 sm:col-span-3">{experience.description}</p>
                    </div>
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </section>
  );
}

export default Experiences;