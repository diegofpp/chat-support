const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // 1. Crear un usuario técnico
  const technician = await prisma.user.create({
    data: {
      email: 'tecnico@ejemplo.com',
      name: 'Técnico Ejemplo',
      role: 'TECHNICIAN',
    },
  })
  console.log('Técnico creado:', technician)

  // 2. Crear un usuario normal
  const user = await prisma.user.create({
    data: {
      email: 'usuario@ejemplo.com',
      name: 'Usuario Ejemplo',
      role: 'USER',
    },
  })
  console.log('Usuario creado:', user)

  // 3. Crear un ticket
  const ticket = await prisma.ticket.create({
    data: {
      title: 'Problema de inicio de sesión',
      description: 'No puedo acceder a mi cuenta',
      userId: user.id,
      status: 'OPEN',
      priority: 'HIGH',
    },
  })
  console.log('Ticket creado:', ticket)

  // 4. Asignar el ticket al técnico
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      assignedToId: technician.id,
      status: 'IN_PROGRESS',
    },
  })
  console.log('Ticket actualizado:', updatedTicket)

  // 5. Agregar un mensaje al ticket
  const message = await prisma.message.create({
    data: {
      content: 'Hola, estoy revisando tu problema de inicio de sesión.',
      userId: technician.id,
      ticketId: ticket.id,
    },
  })
  console.log('Mensaje creado:', message)

  // 6. Consultar el ticket con sus relaciones
  const ticketWithDetails = await prisma.ticket.findUnique({
    where: { id: ticket.id },
    include: {
      user: true,
      assignedTo: true,
      messages: true,
    },
  })
  console.log('Ticket con detalles:', JSON.stringify(ticketWithDetails, null, 2))
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 