
import prisma from "@/lib/prisma";
import Link from "next/link";



export default async function InstitutionsPage() {
  const institutions = await prisma.institution.findMany({
    include: {
      documents: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>Institutions</h1>

      <div style={styles.grid}>
        {institutions.map((inst) => (
          <Link
            key={inst.id}
            href={`/admin/institutions/${inst.id}`}
            style={styles.card}
          >
            <div style={styles.header}>
              <div style={styles.name}>{inst.instName}</div>
              <div style={styles.badge}>{inst.instType}</div>
            </div>

            <div style={styles.meta}>
              <div>📍 {inst.state}</div>
              <div>🏥 {inst.lga}</div>
              <div>📦 Services: {inst.services?.length || 0}</div>
            </div>

            <div style={styles.footer}>
              <span>{inst.email}</span>
              <span style={styles.arrow}>→</span>
            </div>
          </Link>
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
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 20,
    color: "#0d47a1",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    textDecoration: "none",
    color: "inherit",
    border: "1px solid #e0eeec",
    boxShadow: "0 2px 10px rgba(13,71,161,0.06)",
    transition: "0.2s",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  name: {
    fontWeight: 700,
    fontSize: 15,
    color: "#063b38",
  },

  badge: {
    fontSize: 10,
    background: "#e8f4f3",
    padding: "3px 10px",
    borderRadius: 20,
    color: "#0d47a1",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  meta: {
    fontSize: 12,
    color: "#5a8a84",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 12,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#9db5b2",
  },

  arrow: {
    fontWeight: 800,
    color: "#0d47a1",
  },
};