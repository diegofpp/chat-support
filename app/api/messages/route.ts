// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET: Listar mensajes por ticket
export async function GET(req: NextRequest) {
  // 1. Obtener el ticketId de la query (?ticketId=...)
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get("ticketId");

  if (!ticketId) {
    return NextResponse.json({ error: "ticketId requerido" }, { status: 400 });
  }

  // 2. Buscar mensajes en la base de datos
  const messages = await prisma.message.findMany({
    where: { ticketId },
    orderBy: { createdAt: "asc" },
    include: { user: true }, // Incluye info del usuario que envió el mensaje
  });

  return NextResponse.json(messages);
}

// POST: Enviar un nuevo mensaje
export async function POST(req: NextRequest) {
  // 1. Verificar sesión (usuario autenticado)
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // 2. Leer datos del body
  const { ticketId, content } = await req.json();

  if (!ticketId || !content) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  // 3. Crear el mensaje en la base de datos
  const message = await prisma.message.create({
    data: {
      content,
      ticketId,
      userId: session.user.id,
    },
    include: { user: true },
  });

  return NextResponse.json(message, { status: 201 });
}