export default function Process() {
  const steps = [
    { title: "Choose", text: "Browse or upload order list" },
    { title: "Verify", text: "Compliance Officer confirms compliance" },
    { title: "Dispatch", text: "Same-day or nationwide delivery" },
    { title: "Receive", text: "Track and receive invoice" },
  ];

  return (
    <section className="px-5 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-serif text-sm text-[#0d47a1]">HOW IT WORKS</p>
        <h2 className="font-serif text-3xl ">
          Simple from start <span className="italic text-[#0d47a1]">to finish.</span>
        </h2>
        <p className="font-serif text-sm mb-10">Whether you're ordering supplies or booking a service — the process is the same.</p>

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