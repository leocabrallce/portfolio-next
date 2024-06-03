type Props = {
  services: {
    _id?: string | null | undefined;
    title?: string | null | undefined;
    description?: string | null | undefined;
    order?: number | null | undefined;
  }[];
};

function Services({ services }: Props) {
  return (

    <section>
      <h2 className="font-title uppercase my-24 text-6xl">
        Services
      </h2>

      <div className="grid grid-rows-8 sm:grid-rows-4 md:grid-rows-2 grid-flow-col gap-y-16 gap-x-8">
        {services.map((service) => (
          <div key={service._id} className="p-4 flex flex-col gap-12 justify-between border-l border-primary-dark/25">
            <h3 className="text-2xl uppercase leading-5">{service.title}</h3>

            <p className="text-lg self-start min-h-28 leading-6">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;