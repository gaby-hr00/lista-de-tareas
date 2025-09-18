import TodoItem from "./TodoItem";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function List() {
    // Obtener usuario logueado
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const usuarioEmail = usuario?.email; //  email como identificador único

  // Estados
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [estado, setEstado] = useState("pendiente");

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Clave única para cada usuario
  const storageKey = `tareas_${usuarioEmail}`;

  // Redirigir si no hay usuario logueado
  useEffect(() => {
    if (!usuarioEmail) {
      navigate("/login");
    }
  }, [usuarioEmail, navigate]);

  // Cargar tareas
  useEffect(() => {
    if (usuarioEmail) {
      const tareasGuardadas = localStorage.getItem(storageKey);
      if (tareasGuardadas) {
        setTareas(JSON.parse(tareasGuardadas));
      }
    }
  }, [storageKey, usuarioEmail]);

  // Guardar tareas 
  useEffect(() => {
    if (usuarioEmail) {
      localStorage.setItem(storageKey, JSON.stringify(tareas));
    }
  }, [tareas, storageKey, usuarioEmail]);

  // Agregar tarea
  const agregarTarea = () => {
    if (titulo.trim()) {
      setTareas([
        ...tareas,
        {
          id: Date.now(),
          titulo,
          descripcion,
          prioridad,
          estado,
          estadoAnterior: "",
          completed: false,
        },
      ]);

      setTitulo("");
      setDescripcion("");
      setPrioridad("media");
      setEstado("pendiente");
    }
  };

  // Marcar/desmarcar tarea
  const toggleCompleted = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? !tarea.completed
            ? {
                ...tarea,
                completed: true,
                estadoAnterior: tarea.estado,
                estado: "completado",
              }
            : {
                ...tarea,
                completed: false,
                estado: tarea.estadoAnterior || "pendiente",
                estadoAnterior: "",
              }
          : tarea
      )
    );
  };

  // Eliminar tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  // Editar tarea
  const editarTarea = (id, nuevosDatos) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, ...nuevosDatos } : tarea
      )
    );
  };

  // Filtrar tareas
  const tareasFiltradas = tareas.filter((tarea) => {
    const filtroEstadoOk =
      filtroEstado === "todas" || tarea.estado === filtroEstado;
    const filtroPrioridadOk =
      filtroPrioridad === "todas" || tarea.prioridad === filtroPrioridad;
    const filtroBusquedaOk =
      tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    return filtroEstadoOk && filtroPrioridadOk && filtroBusquedaOk;
  });

  // cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/registro");
  };

    // Render
  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded shadow bg-pink-200">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">LISTA DE TAREAS</h1>
        <button
          onClick={cerrarSesion}
          className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Buscador */}
      <div className="mb-5 flex relative">
        <Search className="absolute mt-2 ml-2 text-gray-400" />
        <input
          className="w-full p-2 pl-8 border rounded-full bg-white"
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por título o descripción..."
        />
      </div>
      {/* Filtros */}
      <div className="flex gap-2 mb-5 ">
        <select
          className="flex-1 p-2 border rounded bg-white"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todas">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>

        <select
          className="flex-1 p-2 border rounded bg-white"
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
        >
          <option value="todas">Todas las prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      {/* Formulario para añadir tarea */}
      <div className="space-y-3 mb-5">
        <input
          className="w-full p-2 border rounded bg-white"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la tarea"
        />

        <textarea
          className="w-full p-2 border rounded bg-white"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción de la tarea"
        />

        <select
          className="w-full p-2 border rounded bg-white"
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <select
          className="w-full p-2 border rounded bg-white"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>

        <button
          className="w-full bg-violet-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
          onClick={agregarTarea}
        >
          Añadir Tarea
        </button>
      </div>

      {/* Lista de tareas filtradas */}
      <div className="space-y-2">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map((tarea) => (
            <TodoItem
              key={tarea.id}
              tarea={tarea}
              toggleCompleted={toggleCompleted}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay tareas</p>
        )}
      </div>
    </div>
  );
}
