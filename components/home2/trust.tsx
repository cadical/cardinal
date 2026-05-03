export default function Trust() {
  const items = [
    ["CAC REGISTERED", "RC 8969474"],
    ["REGULATORY", "NAFDAC verified"],
    ["SERVICE", "24-hour response"],
    ["PAYMENTS", "Card · transfer · USSD"],
  ];

  return (
    <section className="px-5 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 border rounded-xl overflow-hidden">
        {items.map(([label, value], i) => (
          <div key={i} className="p-4 border">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}