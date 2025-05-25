// test-neon.js
import { neon } from "@neondatabase/serverless";
const sql = neon('postgresql://neondb_owner:npg_aDWnzGFk76Ng@ep-green-sound-acsjbz2g.sa-east-1.aws.neon.tech/neondb?sslmode=require');
sql`SELECT 1`.then(() => {
  console.log("¡Conexión exitosa!");
  process.exit(0);
}).catch((e) => {
  console.error("Error de conexión:", e);
  process.exit(1);
});