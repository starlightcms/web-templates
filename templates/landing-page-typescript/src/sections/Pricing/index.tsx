import { PricingSingleton, Plan as PlanType } from "@/starlight";
import { Entry, Singleton } from "@starlightcms/next-sdk";
import Plan from "@/components/Plan";

type PricingProps = {
  singleton: Singleton<PricingSingleton>;
  collection: Entry<PlanType>[];
};

/**
 * Renders 3 Plan components with pricing and benefit information on payment
 * plans for your app.
 *
 * @see Plan
 */
export default function Pricing({ singleton, collection }: PricingProps) {
  return (
    <div className="text-center">
      <h2 className="text-brand-800 fw-bold">{singleton.data.title}</h2>
      <div className="d-flex flex-column gap-4 mt-6 flex-lg-row justify-content-lg-between">
        {collection.reverse().map((item) => (
          <Plan
            title={item.data.title}
            description={item.data.description}
            popular={item.data.most_popular}
            key={item.slug}
            signupHref="#"
            features={item.data.plan_items}
          />
        ))}
      </div>
    </div>
  );
}
