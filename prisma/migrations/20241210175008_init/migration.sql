-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" BIGINT NOT NULL,
    "telefono" BIGINT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'jugador',

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canchas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" BIGINT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "precio_hora" DOUBLE PRECISION NOT NULL,
    "calle" TEXT NOT NULL,

    CONSTRAINT "Canchas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" TEXT NOT NULL,
    "id_cancha" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "fecha_reserva" TEXT NOT NULL,
    "horario_inicio" TEXT NOT NULL,
    "horario_fin" TEXT NOT NULL,

    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horarios" (
    "id" TEXT NOT NULL,
    "id_cancha" TEXT NOT NULL,
    "horario_inicio" TEXT NOT NULL,
    "horario_fin" TEXT NOT NULL,
    "dias_semana_inicio" TEXT NOT NULL,
    "dias_semana_fin" TEXT NOT NULL,

    CONSTRAINT "Horarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_id_cancha_fkey" FOREIGN KEY ("id_cancha") REFERENCES "Canchas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios" ADD CONSTRAINT "Horarios_id_cancha_fkey" FOREIGN KEY ("id_cancha") REFERENCES "Canchas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
