import React, { FormEvent } from 'react'
import { useDataContext } from '../context/useDataContext'

interface EntradasPageProps{
  handleAddValue: (e: FormEvent<HTMLFormElement>) => void 
}

const SaidasPage = ({handleAddValue}: EntradasPageProps) => {

  const { Saidas, setTypeOfFinance } = useDataContext()

  return (
    <section>

      <form className='bg-red-300 flex flex-col' onSubmit={handleAddValue}>

        <h2>Saidas</h2>

        <input name='idValue' id="idValue" type={"text"} placeholder={"Nome"} />
        <input name='value' id="value" type={"number"} placeholder={"Valor"} />
        <button className='' type={"submit"} onClick={() => setTypeOfFinance(true)}>Adicionar</button>
      </form>

      {Saidas &&
        <div>
          {Saidas.map(entrada => {
            if (entrada != undefined) return (
              <p>{entrada?.idValue + ' : '}{'R$ ' + entrada?.value+ '.00'}</p>
            )
          })}
        </div>}
    </section>
  )
}

export default SaidasPage