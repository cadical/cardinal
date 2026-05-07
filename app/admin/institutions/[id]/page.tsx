import prisma from "@/lib/prisma";

export default async function InstitutionDetail({
  params,
}: {
  params: { id: string };
}) {
  const inst = await prisma.institution.findUnique({
    where: { id: params.id },
    include: { documents: true },
  });

  if (!inst) return <div>Not found</div>;

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>{inst.instName}</h1>

      <div style={styles.card}>
        <h3>Institution Info</h3>
        <p>Type: {inst.instType}</p>
        <p>State: {inst.state}</p>
        <p>LGA: {inst.lga}</p>
        <p>Email: {inst.email}</p>
        <p>Phone: {inst.phone}</p>
      </div>

      <div style={styles.card}>
        <h3>Services</h3>
        <p>{inst.services?.join(", ")}</p>
      </div>

      <div style={styles.card}>
        <h3>Documents</h3>
        {inst.documents.map((doc) => (
          <div key={doc.id} style={styles.doc}>
            <span>{doc.name}</span>
            <a href={doc.url} target="_blank" style={styles.link}>
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: 30,
    fontFamily: "system-ui",
    background: "#f0f7f6",
    minHeight: "100vh",
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0d47a1",
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    border: "1px solid #e0eeec",
  },
  doc: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
  },
  link: {
    color: "#0d47a1",
    fontWeight: 700,
    textDecoration: "none",
  },
};