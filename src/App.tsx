import React, { FormEvent, useEffect, useState } from 'react'
import EntradasPage from './components/EntradasPage'
import SaidasPage from './components/SaidasPage'
import { useDataContext } from './context/useDataContext'
import { MdDelete } from 'react-icons/md'



const App = () => {


  const { TypeOfFinance, setValueEntrada, total, Saidas, Entradas, limpar, Calc } = useDataContext()




  function handleAddValue(e: FormEvent<HTMLFormElement>) {

    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (localStorage.getItem("IdIncrementFinance")) {
      const inc = Number(localStorage.getItem("IdIncrementFinance")) + 1
      localStorage.setItem("IdIncrementFinance", (inc ? inc.toString() : '1'))
    } else {
      localStorage.setItem("IdIncrementFinance", "1")
    }

    localStorage.setItem(`${TypeOfFinance == false ? 'ValorEntrada' : 'ValorSaida'}${localStorage.getItem("IdIncrementFinance")}`, JSON.stringify(data))

    setValueEntrada()
    Calc()
  }




  useEffect(() => {
    Calc()
  }, [Saidas, Entradas])

  console.log(total)

  return (
    <main className='flex flex-col items-center w-full h-screen gap-4'>

      <h1 className='font-serif text-3xl underline underline-offset-4'>
        <b className='text-teal-500 drop-shadow-[1px_1px_1px_black]'>
          Your
        </b>Finances</h1>

      <h2 className={`${total <= 0 ? 'text-red-500' : 'text-green-500'} `}>
        <b>Renda final: </b>
        R$ {total + '.00'}</h2>


      <div className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <EntradasPage handleAddValue={handleAddValue} />
        <SaidasPage handleAddValue={handleAddValue} />
      </div>

      <button className='flex items-center p-2 bg-black text-white rounded-lg'
       onClick={() => limpar()}>
        <MdDelete />
        Limpar
      </button>
    </main>
  )
}

export default App