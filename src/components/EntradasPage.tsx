import React, { FormEvent } from 'react'
import { useDataContext } from '../context/useDataContext'

interface EntradasPageProps {
  handleAddValue: (e: FormEvent<HTMLFormElement>) => void
}

const EntradasPage = ({ handleAddValue }: EntradasPageProps) => {

  const { Entradas, setTypeOfFinance } = useDataContext()

  return (
    <section>
      <form className='gradient-01 flex flex-col rounded-tl-xl p-2 gap-2'
        onSubmit={handleAddValue}>

        <h2 className='mx-auto text-2xl text-gray-100 drop-shadow-[1px_1px_1px_black]'>Entradas</h2>

        <input name='idValue' id="idValue"
          type={"text"} placeholder={"Identificação do valor"}
          className="bg-black/20 rounded-md px-2 text-white placeholder:text-white outline-none hover:bg-green-600/40"
          required />
        <input name='value' id="value"
          type={"number"} placeholder={"Valor arredondado"}
          className="bg-black/20 rounded-md px-2 placeholder:text-white outline-none hover:bg-green-600/40 text-white"
          required />

        <button className='p-1 bg-button bg-green-500 hover:brightness-150' type={"submit"} onClick={() => setTypeOfFinance(false)}>Adicionar</button>
      </form>

      {Entradas &&
        <div className=''>
          {Entradas.map(entrada => {
            if (entrada != undefined) return (
              <div key={entrada.idValue} className='blockEntradas bg-black'>
                {entrada?.idValue + ' : '}{'R$ ' + entrada?.value + '.00'}
              </div>
            )
          })}
        </div>}

    </section>
  )
}

export default EntradasPage