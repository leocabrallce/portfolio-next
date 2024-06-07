"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import { Experience as ExperienceType } from "@/graphql/generated";
import moment from "moment";

type Props = {
  experiences: ExperienceType[];
};

function Experiences({ experiences }: Props) {
  return (
    <section>
      <h2 className="font-title uppercase mb-8 mt-16 md:my-24 text-5xl md:text-6xl">
        Experiences
      </h2>

      <dl className="mt-10 space-y-6 divide-y divide-primary-dark dark:divide-primary-light">
        {experiences.map((experience) => (
          <Disclosure as="div" key={experience._id} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <DisclosureButton className="flex w-full items-start justify-between text-left ">
                    <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
                      <span className="leading-10 md:leading-5 text-2xl uppercase">{experience.company}</span>
                      <span className="text-lg leading-none md:leading-normal">{moment(experience.startDate).format("MMM YYYY")} - {experience.endDate ? moment(experience.endDate).format("MMM YYYY") : "Present"}</span>
                      <span className="text-lg leading-none md:leading-normal">{experience.location}</span>
                      <span className="text-lg leading-none md:leading-normal">{experience.title}</span>
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
                      <p className="text-lg leading-6  sm:col-start-2 sm:col-span-3">{experience.description}</p>
                    </div>
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </dl>

      {/* <Accordion selectionMode="multiple">
        {experiences.map((experience) => (
          <AccordionItem key={experience._id} aria-label={experience.company || ""} title={
            <div className="grid grid-cols-4 w-full">
              <span className="leading-5 text-2xl uppercase">{experience.company}</span>
              <span className="text-lg">{moment(experience.startDate).format("MMM YYYY")} - {experience.endDate ? moment(experience.endDate).format("MMM YYYY") : "Present"}</span>
              <span className="text-lg">{experience.location}</span>
              <span className="text-lg">{experience.title}</span>
            </div>
          }>
            {experience.description}
          </AccordionItem>
        ))}
      </Accordion> */}

      {/* <Accordion as="dl" className="mt-10 space-y-6 divide-y divide-primary-dark/10">
        {experiences.map((experience) => (
          <AccordionItem key={experience._id} as="dt" aria-label={experience.company || ""} title={experience.company || ""} className="flex w-full items-start justify-between text-left ">
            <dd className="mt-2 pr-12">
              <div className="grid grid-cols-1 sm:grid-cols-4 my-16">
                <p className="text-lg leading-6  sm:col-start-2 sm:col-span-3">{experience.description}</p>
              </div>
            </dd>
          </AccordionItem>
        ))}
      </Accordion> */}
    </section>
  );
}

export default Experiences;