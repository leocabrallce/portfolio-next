import { sdk } from "@/lib/graphql-request";
import { SortOrder } from "@/graphql/generated";

async function Services() {
  const getAllServices = await sdk.GetAllServices({ sort: [{ order: SortOrder.Asc }] });
  const services = getAllServices.data.allService;

  return (
    <section>
      <h2 className="font-title uppercase mb-8 mt-16 md:my-24 text-5xl md:text-6xl">
        Services
      </h2>

      <div className="grid grid-rows-8 sm:grid-rows-4 md:grid-rows-2 grid-flow-col gap-y-16 gap-x-8">
        {services.map((service) => (
          <div key={service._id} className="p-4 flex flex-col gap-6 md:gap-12 justify-between border-l border-primary-dark/25 dark:border-primary-light/25">
            <h3 className="text-2xl uppercase leading-6">{service.title}</h3>

            <p className="text-lg self-start md:min-h-28 leading-6">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;