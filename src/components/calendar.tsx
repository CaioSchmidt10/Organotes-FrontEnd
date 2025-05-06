import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, ChevronRight, ChevronDown, CalendarDays } from 'lucide-react';

function Calendar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <main>
        <div className="flex flex-col gap-4  h-screen w-[300px] bg-[#343870]">
          {/* Nome e Logo */}
          <div className="pt-3 flex justify-center">
            <h1 className="text-4xl text-white relative font-bold after:content-[''] after:block after:w-[68px] after:h-[2px] after:bg-white after:ml-auto">
              OrgaNotes
            </h1>
            <img src="/logo.png" alt="Logo" className="mt-2 h-8" />
          </div>

          <div className="w-full h-[1px] bg-white"></div>

          {/* Categorias */}
          <div className="px-3 mx-3 text-white bg-[#434561] flex justify-center gap-4 rounded-2xl">
            <Link to={'/'}>
              <div className="flex hover:text-[#CACCE5]  opacity-65 hover:underline transition duration-200 ease-in-out cursor-pointer px-2 py-2">
                <h1>Estudos</h1>
              </div>
            </Link>

            <Link to={'/'}>
              <div className="flex  hover:text-[#CACCE5] hover:underline transition duration-200 ease-in-out cursor-pointer bg-[#3B3D58] px-2 py-2 rounded-xl">
                <h1>Calendário</h1>
              </div>
            </Link>

            <Link to={'/'}>
              <div className="flex hover:text-[#CACCE5] hover:underline  opacity-65 transition duration-200 ease-in-out cursor-pointer px-2 py-2">
                <h1>Notas</h1>
              </div>
            </Link>
          </div>

          <div className="w-full h-[1px] bg-white"></div>

          {/* Barra de Pesquisa */}
          <div className="px-3 py-2 mx-3 text-white bg-[#434561] flex gap-4 rounded-2xl opacity-65 items-center">
            <Search />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="bg-transparent outline-none placeholder-white text-white w-full"
            />
          </div>

          <div className="w-full h-[1px] bg-white"></div>

          {/* Calendario */}
          <div className="mx-3 text-white">
            <button
              onClick={toggle}
              className="px-2 flex items-center gap-2 focus:outline-none"
            >
              <ChevronRight
                className={`transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : ''
                }`}
              />
              <CalendarDays />
              <h1 className="text-2xl">Calendário</h1>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
              } bg-[#2d2f45] rounded-xl px-4`}
            >
              <div className="py-4">
                {/* Conteúdo adicional */}
                <p>Conteúdo adicional do calendário.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Calendar;
