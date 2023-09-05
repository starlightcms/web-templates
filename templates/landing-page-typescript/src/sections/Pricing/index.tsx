import Plan from "@/components/Plan";

// TODO! Description?
export default function Pricing() {
  return (
    <div className="text-center">
      <h2 className="text-brand-800 fw-bold">Pricing</h2>
      <div className="d-flex flex-column gap-4 mt-6 flex-lg-row justify-content-lg-between">
        <Plan
          title="Pro"
          description="Lorem ipsum dolor sit amet consectetur."
          signupHref="#"
          features={[
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
          ]}
        />
        <Plan
          title="Premium"
          description="Lorem ipsum dolor sit amet consectetur."
          signupHref="#"
          popular
          features={[
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
          ]}
        />
        <Plan
          title="Ultimate"
          description="Lorem ipsum dolor sit amet consectetur."
          signupHref="#"
          features={[
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
            "Dapibus ac facilisis in",
          ]}
        />
      </div>
    </div>
  );
}
