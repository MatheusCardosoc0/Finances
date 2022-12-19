import React, { FormEvent } from 'react'
import { useDataContext } from '../context/useDataContext'

interface EntradasPageProps {
  handleAddValue: (e: FormEvent<HTMLFormElement>) => void
}

const SaidasPage = ({ handleAddValue }: EntradasPageProps) => {

  const { Saidas, setTypeOfFinance } = useDataContext()

  return (
    <section>

      <form className='gradient-02 flex flex-col rounded-tr-xl p-2 gap-2'
        onSubmit={handleAddValue}>

        <h2 className='mx-auto text-2xl text-gray-100 drop-shadow-[1px_1px_1px_black]'>Saidas</h2>

        <input name='idValue' id="idValue"
          type={"text"} placeholder={"Identificação do valor"}
          className="bg-black/20 rounded-md px-2 text-white placeholder:text-white outline-none hover:bg-red-600/60"
          required />

        <input name='value' id="value"
          type={"number"} placeholder={"Valor arredondado"}
          className="bg-black/20 rounded-md px-2 text-white placeholder:text-white outline-none hover:bg-red-600/60"
          required />

        <button className='p-1 bg-button bg-red-500 hover:brightness-150' type={"submit"} onClick={() => setTypeOfFinance(true)}>Adicionar</button>
      </form>

      {Saidas &&
        <div>
          {Saidas.map(entrada => {
            if (entrada != undefined) return (
              <div className='blockSaidas'>
                {entrada?.idValue + ' : '}{'R$ ' + entrada?.value + '.00'}
                </div>
            )
          })}
        </div>}
    </section>
  )
}

export default SaidasPage