export default function Process() {
  const steps = [
    { title: "Choose", text: "Browse or upload order list" },
    { title: "Verify", text: "Pharmacist confirms compliance" },
    { title: "Dispatch", text: "Same-day or nationwide delivery" },
    { title: "Receive", text: "Track and receive invoice" },
  ];

  return (
    <section className="px-5 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl mb-10">
          Simple from start <span className="italic text-teal">to finish.</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="w-12 h-12 rounded-full border flex items-center justify-center text-teal font-serif mb-4">
                {i + 1}
              </div>
              <h4 className="font-serif text-lg">{s.title}</h4>
              <p className="text-sm text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}