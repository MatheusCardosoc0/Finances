import React, { FormEvent, useEffect, useState } from 'react'

interface EntradaProps {
  idValue: string
  value: string
}

const App = () => {


  const [Entradas, setEntradas] = useState<EntradaProps[]>([])
  const [Saidas, setSaidas] = useState<EntradaProps[]>([])
  const [TypeOfFinance, setTypeOfFinance] = useState<boolean>(false)

  const setValueEntrada = () => {
    const arrayz = new Array
    const arrayx = new Array
    for (let index = 1; index <= Number(localStorage.getItem("IdIncrementFinance")); index++) {


      let value = JSON.parse(localStorage.getItem(`${TypeOfFinance == false? 'ValorEntrada' : 'ValorSaida'}${index}`))

     

      if(TypeOfFinance == false){
        arrayz.push(value)
      }else{
        arrayx.push(value)
      }





    }
    if(TypeOfFinance == false){
      setEntradas(arrayz)
    }else{
      setSaidas(arrayx)
    }
  }

  useEffect(() => {
    setValueEntrada()
  }, [localStorage.length])

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

    localStorage.setItem(`${TypeOfFinance == false? 'ValorEntrada' : 'ValorSaida'}${localStorage.getItem("IdIncrementFinance")}`, JSON.stringify(data))

    setValueEntrada()
  }



  function limpar() {
    localStorage.clear()
    setEntradas([])
  }


  return (
    <main className='flex flex-col items-center w-full h-screen gap-10'>

      <h1>App de finanças</h1>
      <form className='bg-green-300 flex flex-col' onSubmit={handleAddValue}>

        <h2>Entradas</h2>

        <input name='idValue' id="idValue" type={"text"} placeholder={"Nome"} />
        <input name='value' id="value" type={"number"} placeholder={"Valor"} />
        <button className='' type={"submit"} onClick={() => setTypeOfFinance(false)}>Adicionar</button>
      </form>

      {Entradas &&
        <div>
          {Entradas.map(entrada => {if(entrada != undefined) return(
            <p>{entrada?.idValue + ' : '}{entrada?.value}</p>
          )})}
        </div>}





      <form className='bg-red-300 flex flex-col' onSubmit={handleAddValue}>

        <h2>Saidas</h2>

        <input name='idValue' id="idValue" type={"text"} placeholder={"Nome"} />
        <input name='value' id="value" type={"number"} placeholder={"Valor"} />
        <button className='' type={"submit"} onClick={() => setTypeOfFinance(true)}>Adicionar</button>
      </form>

      {Saidas &&
        <div>
          {Saidas.map(entrada => {if(entrada != undefined) return(
            <p>{entrada?.idValue + ' : '}{entrada?.value}</p>
          )})}
        </div>}

      <button onClick={() => limpar()}>Limpar</button>
    </main>
  )
}

export default App