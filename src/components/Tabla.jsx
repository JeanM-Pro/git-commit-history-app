import { format } from "date-fns";

export const Tabla = ({ datos }) => {
  return (
    <>
      <table className="bg-green-400 w-auto">
        <thead>
          <tr className="bg-red-100">
            <th className="border border-black px-1">#</th>
            <th className="border min-w-[110px] border-black">Author</th>
            <th className="border border-black min-w-[250px]">Message</th>
            <th className="border border-black px-4">SHA</th>
            <th className="border border-black min-w-[150px]">Data</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"
                } border border-black`}
              >
                <td className="border border-black text-center p-1">
                  {index + 1}
                </td>
                <td className="border border-black text-center min-w-[110px] px-1">
                  {item.commit.author.name}
                </td>
                <td className="border border-black px-1 min-w-[250px]">
                  {item.commit.message}
                </td>
                <td className="border border-black text-center px-1">
                  {item.sha}
                </td>
                <td className="border border-black text-center min-w-[150px]">
                  {format(
                    new Date(item.commit.author.date),
                    "dd/MM/yyyy HH:mm"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className=" border border-black">
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
