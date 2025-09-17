import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function TodoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState(tarea.prioridad);
  const [estado, setEstado] = useState(tarea.estado);

  const guardarEdicion = () => {
    editarTarea(tarea.id, { titulo, descripcion, prioridad, estado });
    setEditando(false);
  };

  return (
    <div className="border p-3 rounded shadow-sm bg-gray-50">
      {editando ? (
        // Modo edición
        <div className="space-y-2">
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <select
            className="w-full p-2 border rounded"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={guardarEdicion}
            >
              Guardar
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo visualización
        <>
          <div className="flex items-center justify-between">
            <h3
              className={`font-bold ${
                tarea.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {tarea.titulo}
            </h3>

            <div className="flex items-center gap-3">
              {/* Checkbox para marcar completada */}
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={tarea.completed}
                onChange={() => toggleCompleted(tarea.id)}
              />

              {/* Botón editar */}
              <button onClick={() => setEditando(true)}>
                <PencilIcon className="w-5 h-5 text-blue-500" />
              </button>

              {/* Botón eliminar */}
              <button onClick={() => eliminarTarea(tarea.id)}>
                <TrashIcon className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>

          {/* Descripción */}
          {tarea.descripcion && (
            <p className="text-gray-600 mt-1">{tarea.descripcion}</p>
          )}

          {/* Prioridad y estado */}
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={`px-2 py-1 rounded text-white ${
                tarea.prioridad === "alta"
                  ? "bg-red-500"
                  : tarea.prioridad === "media"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              Prioridad: {tarea.prioridad}
            </span>

            <span
              className={`px-2 py-1 rounded ${
                tarea.estado === "pendiente"
                  ? "bg-gray-300 text-gray-700"
                  : tarea.estado === "en progreso"
                  ? "bg-blue-300 text-blue-700"
                  : "bg-green-300 text-green-700"
              }`}
            >
              {tarea.estado}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
